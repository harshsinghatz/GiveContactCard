import * as redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = redis.createClient({
    password: process.env.REDISPASSWORD!,
    url: process.env.REDIS_URL
});

client.on('error', err => {
    console.log('Error ' + err);
});

(async()=>{
  await client.connect();
})();

export const getSinceId=async()=>{
  const sinceId = await client.get("since_id");
  console.log("Get count result: ", sinceId);
  return sinceId;
}

export const setSinceId=async(value:string)=>{
  await client.set("since_id", value);
  console.log("Done:");
}