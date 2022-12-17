import {
  getUser,
  replyToTweet,
  getAuthUserMentions,
  getMediaID,
} from './twitter/helper';
import {
  userFormatTweet, Mention
} from './util';
import { giveModifiedImage } from './jimp';
import { getSinceId, setSinceId } from './redis';
import { getCustomUserInfo } from './prisma/helper';
import { saveBase64Image } from './util';

const DEFAULT_PARAMS = { "since_id": "" };

const main = async () => {
  const last_tweet_id = await getSinceId();
  const params = DEFAULT_PARAMS;

  if (last_tweet_id) {
    params["since_id"] = last_tweet_id;
  }

  try {
    const { data: allMentions } = await getAuthUserMentions(params.since_id);
    console.log("Getting mentions...");

    allMentions.forEach(async (mention: Mention, index: number) => {
      const { data } = await getUser(mention.author_id);
      let outputImage;
      let tweet;
      let outputImageBase64;
      [outputImageBase64,tweet]= await getCustomUserInfo(mention.author_id);

      if(outputImageBase64){
        outputImage = await saveBase64Image(outputImageBase64); 
      }

      if(!outputImage){
        outputImage = await giveModifiedImage(data.name,data.profile_image_url);
      }

      if(!tweet){
        tweet=userFormatTweet(data);
      }

      // @ts-ignore
      let {media_id_string:mediaId}= await getMediaID(outputImage);
      //@ts-ignore
      console.log("media id:",mediaId,outputImage);
      await replyToTweet(mention.id, tweet ,mediaId);
      console.log("Replying to tweet id:",mention.id);

      if (index === 0) {
        console.log("Updating last tweet...")
        await setSinceId(mention.id);
      }
    })
  } catch (err) {
    console.log("No latest tweet...");
  }
}

setInterval(async()=>{
  main();
},10000);