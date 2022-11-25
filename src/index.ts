import {
  getUser,
  replyToTweet,
  getAuthUserMentions,
  getMediaID
} from './twitter/helper';
import {
  writeLastTweet,
  readLastTweet,
  userFormatTweet, Mention
} from './util';
import { giveModifiedImage } from './jimp';

const DEFAULT_PARAMS = { "since_id": "" };

const main = async () => {
  const { since_id: last_tweet_id } = readLastTweet();
  const params = DEFAULT_PARAMS;

  if (last_tweet_id) {
    params["since_id"] = last_tweet_id;
  }

  try {
    const { data: allMentions } = await getAuthUserMentions(params.since_id);
    console.log("Getting mentions...");

    allMentions.forEach(async (mention: Mention, index: number) => {
      const { data } = await getUser(mention.author_id);
      const outputImage=await giveModifiedImage(data.name,data.profile_image_url);
      //@ts-ignore
      const {media_id_string:mediaId}= await getMediaID(outputImage);
      //@ts-ignore
      // const mediaId=media.media_id;
      console.log("media id:",mediaId,outputImage);
      await replyToTweet(mention.id, userFormatTweet(data),mediaId);
      console.log("Replying to tweet id:",mention.id);

      if (index === 0) {
        console.log("Updating last tweet...")
        writeLastTweet({
          since_id: mention.id
        });
      }
    })
  } catch (err) {
    console.log("No latest tweet...");
  }
}

setInterval(()=>{
  main();
},5000);