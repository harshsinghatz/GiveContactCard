import TwitterApi from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

export default twitterClient;