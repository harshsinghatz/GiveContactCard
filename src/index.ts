// https://www.postman.com/twitter/workspace/twitter-s-public-workspace/request/9956214-d937975d-01c7-4836-9a81-12adcaf1a5dd

// Pseudo code

// init a file with name last_tweet - done
// get the user name of the bot by User Lookup/Authenticated User Lookup - done
// get all the user since the last mention id mention timeline by Timelines/User mention timeline by ID 
// reply to the tweet with all the info + a card
// store the last mention id inside a file 
// rerun the application in every 5000ms

import twitterClient from "./twitter";
import path from 'path';
const lastTweetPath=path.join(__dirname,'last_tweet.json');
import fs from 'fs';

interface Mention{
  id:string;
  text:string;
  author_id:string;
}

const writeLastTweet=(data:object)=>fs.writeFileSync(lastTweetPath,JSON.stringify(data));

const readLastTweet=()=>JSON.parse(fs.readFileSync(lastTweetPath).toString());


// @desc get authenticated user
// sample output
// {
//   data: {
//     id: 'some-id',
//     name: 'Give Contact Cards',
//     username: 'GiveContactCard'
//   }
// }
const getAuthUser=async()=>{
  try{
    return twitterClient.v2.get('users/me');
  }catch(err){
    console.log(err);
    return {};
  }
}

const getUser=async(id:string)=>{
  try{
    return twitterClient.v2.get(`users/${id}?user.fields=description,location,name,profile_image_url,url,username`);
  }catch(err){
    console.log(err);
    return {};
  }
}

// POST /tweets
const replyToTweet=async(replyTweetId:string,tweet:string)=>{
  try{
    return twitterClient.v2.post(`tweets`,{"text":tweet,"reply":{"in_reply_to_tweet_id":replyTweetId}});
  }catch(err){
    console.log(err);
    return {};
  }
}

const userFormatTweet=(data:{name:string;description:string;location:string;url:string;})=>{
  return `Name: ${data.name}
About: ${data.description}
From: ${data.location}
Contact Me👇
${data.url}`;
}

// GET /2/users/:id/mentions
const getAllMentions=async()=>{
  const {data}= await getAuthUser();

  const {since_id:last_tweet_id}=readLastTweet();
  const params={"since_id":""};

  if(last_tweet_id){
    params["since_id"]=last_tweet_id;
  }

  const res=await twitterClient.v2.get(`users/${data.id}/mentions${params.since_id?"?since_id="+params.since_id+"&tweet.fields=author_id":"?tweet.fields=author_id"}`);
  console.log(res);
  const allMentions=res.data;
  
  try{
    allMentions.forEach(async(mention:Mention,index:number)=>{
      const aboutUser=await getUser(mention.author_id);
      const data=aboutUser.data;
      // Reply to user
      await replyToTweet(mention.id,userFormatTweet(data));

      console.log(aboutUser);
      if(index===0){
        writeLastTweet({
          since_id:mention.id
        });
      }
    })
  }catch(err){
    console.log("No latest tweet");
  }
}

getAllMentions();