import path from 'path';
import fs from 'fs';

export interface Mention{
  id:string;
  text:string;
  author_id:string;
}

const lastTweetPath=path.join(__dirname,'../data/last_tweet.json');

// @desc update the latest tweet id
export const writeLastTweet=(data:object)=>fs.writeFileSync(lastTweetPath,JSON.stringify(data));

// @desc read the last tweet id
export const readLastTweet=()=>JSON.parse(fs.readFileSync(lastTweetPath).toString());

// @desc get tweet text content
export const userFormatTweet=(data:{name:string;description:string;location:string;url:string;})=>{
  return `Name: ${data.name}
About: ${data.description}
From: ${data.location}
Contact Me👇
${data.url}`;
}