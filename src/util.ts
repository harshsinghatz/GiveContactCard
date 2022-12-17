import path from 'path';
import fs from 'fs';

const resImgPath=path.join(__dirname,'../data/res.png');

export interface Mention{
  id:string;
  text:string;
  author_id:string;
}

// @desc get tweet text content
export const userFormatTweet=(data:{name?:string;description?:string;location?:string;url?:string;})=>{
  return `Name: ${data?.name}
About: ${data?.description}
From: ${data?.location}
Contact Me👇
${data?.url}`;
}

export const saveBase64Image =(base64String:string)=>{
  try{
    const buff= Buffer.from(base64String,'base64');
    fs.writeFileSync(resImgPath,buff);
    return resImgPath;
  }catch(e){
    return '';
  }
}