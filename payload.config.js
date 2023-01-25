import { buildConfig } from "payload/config";
import Financial from "./collections/Financial";
import Personal from "./collections/Personal";
import Users from "./collections/Users";
import Nextpayments from "./collections/Nextpayments";
import Referrals from "./collections/Referrals";
import Referralpayment from "./collections/Referralpayment";
import Paid from "./collections/Paid";

export default buildConfig({
  serverURL: "http://localhost:3000",
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
  csrf: ["https://kingkoins.site", "http://localhost:8080", "http://localhost:8081"],
  cors: "*",
});
