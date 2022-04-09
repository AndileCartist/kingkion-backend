
const Paid = {
  slug: "paid",
  admin: {
    useAsTitle: "paid",
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

export default Paid;
