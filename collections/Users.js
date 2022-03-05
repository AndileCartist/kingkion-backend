import payload from "payload";
let approvedChanged = null;
const approved = async ({ doc, req, operation }) => {
  if (operation === "update" && doc.approved !== approvedChanged) {
    const banking = await payload.find({
      collection: "financial",
      where: {
        user: {
          equals: doc.id,
        },
      },
    });
    const info = await payload.find({
      collection: "personal",
      where: {
        user: {
          equals: doc.id,
        },
      },
    });

    const referral = await payload.find({
      collection: "referrals",
      where: {
        user: {
          equals: doc.id,
        },
      },
    });
    if (doc.approved) {
      if (info.totalDocs !== 0) {
        if (referral.totalDocs == 1) {
          const percent = referral.docs[0].referrals < 20 ? 5 : 10;
          const amount =
            referral.docs[0].amount === undefined ? 0 : referral.docs[0].amount;
          await payload.create({
            collection: "referrals",
            data: {
              referrals: referral.docs[0].referrals + 1,
              amount:
                amount + Math.trunc((percent / 100) * info.docs[0].amount),
              user: doc.id,
              lastPercent: percent,
              lastAdded: Math.trunc((percent / 100) * info.docs[0].amount),
            },
          });
        } else {
          await payload.create({
            collection: "referrals",
            data: {
              referrals: 1,
              amount: Math.trunc((5 / 100) * info.docs[0].amount),
              user: doc.id,
              lastPercent: 5,
              lastAdded: Math.trunc((5 / 100) * info.docs[0].amount),
            },
          });
        }
      }
      if (info.totalDocs !== 0 && banking.totalDocs !== 0) {
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        await payload.create({
          collection: "nextpayments",
          id: doc.id,
          data: {
            user: doc.id,
            name: doc.name,
            contact: doc.contact,
            accountType: banking.docs[0].accountType,
            accountNumber: banking.docs[0].accountNumber,
            accountOwner: banking.docs[0].accountOwner,
            bank: banking.docs[0].bank,
            bitcoin: banking.docs[0].bitcoin,
            ethereum: banking.docs[0].ethereum,
            dogecoin: banking.docs[0].dogecoin,
            date: new Date(year, month, day + 15),
            amount: info.docs[0].amount * 0.5,
          },
        });
      }
    } else {
      if (referral.totalDocs !== 0) {
        const amount = referral.docs[0].amount === undefined ? 0 : referral.docs[0].amount;
        await payload.create({
          collection: "referrals",
          data: {
            referrals: referral.docs[0].referrals - 1,
            amount: amount - referral.docs[0].lastAdded,
            user: doc.id,
          },
        });
      }
      const nextpay = await payload.find({
        collection: "nextpayments",
        where: {
          user: {
            equals: doc.id,
          },
        },
      });
      await payload.delete({
        collection: "nextpayments",
        id: nextpay.docs[0].id,
      });
    }
  }
};
const getReferral = async ({ data, req, operation, originalDoc }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: data.referralEmail,
        },
      },
    });
    if (user.totalDocs !== 0) {
      data.referralEmail = user.docs[0].id;
    }
    return data;
  }
};
const checkApproved = async ({ data, req, operation, originalDoc }) => {
  if (operation === "update") {
    // approvedChanged = data.approved
    const user = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: data.email,
        },
      },
    });
    approvedChanged = user.docs[0].approved;
    return data;
  }
};

const Users = {
  slug: "users",
  auth: {
    useAPIKey: true,
    maxLoginAttempts: 0,
    verify: {
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `http://localhost:8080/redirect?token=${token}`;

        return `Hey ${user.email}, verify your email by clicking here: ${url}`;
      },
    },
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `https://mafo-academy.netlify.app/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Reset your password with link below!</h1>
              <p>Hello, ${user.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `;
      },
    },
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    //beforeRead: [onlyNameIfPublic],
    // beforeValidate: [profileUpdate],
    beforeChange: [getReferral],
    afterChange: [approved],
    afterRead: [],
    beforeValidate: [checkApproved],
  },
  fields: [
    // Email added by default
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "contact",
      type: "text",
      required: true,
    },
    {
      name: "referralEmail",
      type: "relationship",
      relationTo: "users",
      //   required: true,
      hasMany: false,
    },
    {
      name: "firstname",
      type: "text",
    },
    {
      name: "surname",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "user",
      options: ["user", "admin"],
    },
  ],
};

export default Users;