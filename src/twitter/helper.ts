import twitterClient from "./index";


// @desc get authenticated user

/**
 * @desc Get the authenticated user
 */
export const getAuthUser=async()=>{
  try{
    return twitterClient.v2.get('users/me');
  }catch(err){
    console.log(err);
    return {};
  }
}

/**
 * @desc get user based on id passed
 * @param id : user-id
 * @method GET /v2/users/id
 */
export const getUser=async(id:string)=>{
  try{
    return twitterClient.v2.get(`users/${id}?user.fields=description,location,name,profile_image_url,url,username`);
  }catch(err){
    console.log(err);
    return {};
  }
}

/**
 * @desc get user based on id passed
 * @param replyToTweet : Tweet id where auth user was tagged
 * @param tweet : text content for the new tweet
 * @method POST /v2/tweets
 */
export const replyToTweet=async(replyTweetId:string,tweet:string,media_id:string)=>{
  try{
    return twitterClient.v2.post(`tweets`,{"text":tweet,"reply":{"in_reply_to_tweet_id":replyTweetId},"media":{"media_ids":[media_id]}});
  }catch(err){
    console.log(err);
    return {};
  }
}

/**
 * @desc get user based on id passed
 * @param since_id : last visited id
 * @method GET /2/users/:id/mentions
 */
export const getAuthUserMentions=async(since_id:string)=>{
  try{
    const {data}= await getAuthUser();
    return twitterClient.v2.get(`users/${data.id}/mentions${since_id?"?since_id="+since_id+"&tweet.fields=author_id":"?tweet.fields=author_id"}`)
  }catch(err){
    console.log(err);
    return {};
  }
}

/**
 * @desc get user based on id passed
 * @param since_id : last visited id
 * @method GET /2/users/:id/mentions
 */
 export const uploadMedia=async(since_id:string)=>{
  try{
    const {data}= await getAuthUser();
    return twitterClient.v2.get(`users/${data.id}/mentions${since_id?"?since_id="+since_id+"&tweet.fields=author_id":"?tweet.fields=author_id"}`)
  }catch(err){
    console.log(err);
    return {};
  }
}