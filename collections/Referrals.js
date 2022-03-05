import payload from "payload";
const afterChangeHook = async ({ doc, req, operation }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "referrals",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    const supplus = user.docs.slice(1);
    supplus.forEach(async (sup) => {
      await payload.delete({
        collection: "referrals",
        id: sup.id,
      });
    });
  }
  // console.log(doc)
  // return doc;
};
const Referrals = {
    slug: "referrals",
    admin: {
      useAsTitle: "referrals",
      defaultColumns: ["referrals", "user","amount", "lastPercent"],
    },
    access: {
      read: () => true,
    },
    hooks: {
      afterChange: [afterChangeHook],
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
        name: "lastPercent",
        type: "number",
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "referrals",
        type: "number",
      },
      {
        name: "lastAdded",
        type: "number",
      },
    ],
    
  };
  
  export default Referrals;
  