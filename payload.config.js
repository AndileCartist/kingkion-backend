import { buildConfig } from 'payload/config';
import Financial from './collections/Financial';
import Personal from './collections/Personal';
import Users from './collections/Users';
import Nextpayments from './collections/Nextpayments'
import Referrals from './collections/Referrals'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Financial,
    Personal,
    Users,
    Nextpayments,
    Referrals
  ],
  csrf: [ // whitelist of domains to allow cookie auth from
    "*"
  ],
  cors: "*",
});
