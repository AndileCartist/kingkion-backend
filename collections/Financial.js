import payload from "payload";
const afterChangeHook = async ({ doc, req, operation }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "financial",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    const supplus = user.docs.slice(1);
    supplus.forEach(async (sup) => {
      await payload.delete({
        collection: "financial",
        id: sup.id,
      });
    });
  }
  // console.log(doc)
  // return doc;
};
const Financial = {
  slug: "financial",
  admin: {
    useAsTitle: "financial info",
    defaultColumns: ["user","bitcoin", "accountNumber", "bank", "accountOwner", "accountType"],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [afterChangeHook],
    //afterChange: [afterChangeHook],
  //  beforeChange: [getAmount],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      unique: true,
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
      name: "accountOwner",
      type: "text",
    },
    {
      name: "accountNumber",
      type: "text",
    },
    {
      name: "bank",
      type: "text",
    },
    {
      name: "accountType",
      type: "text",
    },
    {
      name: "accountOwnerNumber",
      type: "text",
    },
    
  ],
};

export default Financial;