import payload from "payload";
const getAmount = async ({ data, req, operation, originalDoc }) => {
  const user = await payload.find({
    collection: "referrals",
    where: {
      user: {
        equals: data.user,
      },
    },
  });
  if (user.totalDocs !== 0) {
    data.amount = user.docs[0].amount;
  }
  return data;
};
const afterChangeHook = async ({ doc, req, operation }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "nextreferralpayments",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    const supplus = user.docs.slice(1);
    supplus.forEach(async (sup) => {
      await payload.delete({
        collection: "nextreferralpayments",
        id: sup.id,
      });
    });
    const user2 = await payload.find({
      collection: "referrals",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    await payload.delete({
      collection: "referrals",
      id: user2.docs[0].id,
    });
  }
  // console.log(doc)
  // return doc;
};
const nextreferralpayments = {
  slug: "nextreferralpayments",
  admin: {
    useAsTitle: "payments",
    defaultColumns: ["user","date", "amount", "bank", "accountNumber", "accountType"],
  },
  access: {
    read: () => true,
    create: () => true
  },
  hooks: {
    afterChange: [afterChangeHook],
    beforeChange: [getAmount],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      unique: true,
    },
    {
      name: "contact",
      type: "text",
    },
    {
        name: "paid",
        type: "checkbox",
        defaultValue: false,
      },
    {
      name: "amount",
      type: "number",
    },
    {
      name: "accountType",
      type: "text",
    },
    {
      name: "accountNumber",
      type: "text",
    },
    {
      name: "accountOwner",
      type: "text",
    },
    {
      name: "bank",
      type: "text",
    },
    {
      name: "bitcoin",
      type: "text",
    },
    {
      name: "ethereum",
      type: "text",
    },
    {
      name: "dogecoin",
      type: "text",
    },
    {
      name: "date",
      type: "date",
    },
    
  ],
  timestamps: false,
};

export default nextreferralpayments;
