import { buildConfig } from "payload/config";
import Financial from "./collections/Financial";
import Personal from "./collections/Personal";
import Users from "./collections/Users";
import Nextpayments from "./collections/Nextpayments";
import Referrals from "./collections/Referrals";
import Referralpayment from "./collections/Referralpayment";
import Paid from "./collections/Paid";

export default buildConfig({
  serverURL: "https://king-koins.herokuapp.com",
  admin: {
    user: Users.slug,
  },
  collections: [
    Financial,
    Personal,
    Users,
    Referralpayment,
    Nextpayments,
    Referrals,
    Paid,
    // Nextreferralpayments,
  ],
  csrf: [
    // whitelist of domains to allow cookie auth from
    "*",
  ],
  cors: ["https://kingkoins.site"],
});
