import payload from "payload";
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
  },
  hooks: {
    afterChange: [afterChangeHook],
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
