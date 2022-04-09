import payload from "payload";
const afterChangeHook = async ({ doc, req, operation }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "personal",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    const supplus = user.docs.slice(1);
    supplus.forEach(async (sup) => {
      await payload.delete({
        collection: "personal",
        id: sup.id,
      });
    });
  }
  // console.log(doc)
  // return doc;
};
const getAmount = async ({ data, req, operation, originalDoc }) => {
  const user = await payload.find({
    collection: "personal",
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
const Personal = {
  slug: "personal",
  admin: {
    useAsTitle: "personal info",
    defaultColumns: ["user", "surname", "amount", "city", "gender"],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [afterChangeHook],
    beforeChange: [getAmount],
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
      name: "firstname",
      type: "text",
    },
    {
      name: "surname",
      type: "text",
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "postal",
      type: "text",
    },
    {
      name: "province",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "gender",
      type: "text",
    },
  ],
};

export default Personal;
