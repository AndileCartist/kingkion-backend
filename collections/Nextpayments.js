import payload from "payload";
const afterChangeHook = async ({ doc, req, operation }) => {
  if (operation === "create") {
    const user = await payload.find({
      collection: "nextpayments",
      where: {
        user: {
          equals: doc.user.id,
        },
      },
    });
    // const supplus = user.docs.slice(1);
    // supplus.forEach(async (sup) => {
    //   await payload.delete({
    //     collection: "nextpayments",
    //     id: sup.id,
    //   });
    // });
  }
  // console.log(doc)
  // return doc;
};
const paid = async ({ doc, req, operation }) => { 
 // console.log(operation, doc.paid)
  if(operation === "update" && doc.paid) {
      const date = new Date();
      const day = date.getDay();
      const month = date.getMonth();
      const year = date.getFullYear();
      await payload.create({
        collection: "paid",
        id: doc.id,
        data: {
          user: doc.user,
          name: doc.name,
          contact: doc.contact,
          accountType: doc.accountType,
          accountNumber:doc.accountNumber,
          accountOwner: doc.accountOwner,
          bank: doc.bank,
          bitcoin: doc.bitcoin,
          ethereum: doc.ethereum,
          dogecoin: doc.dogecoin,
          date: new Date(),
          amount: doc.amount,
        },
      });
   
      await payload.delete({
        collection: "nextpayments",
        id: doc.id,
      });
    
  }
}
const Nextpayments = {
  slug: "nextpayments",
  admin: {
    useAsTitle: "payments",
    defaultColumns: ["user","date", "paid", "amount", "bank", "accountNumber", "accountType"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChangeHook, paid],
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
      name: "paid",
      type: "checkbox",
      defaultValue: false,
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

export default Nextpayments;
