import Jimp from 'jimp';
import path from 'path';

// const inImgPath=path.join(__dirname,'../../data/in.png');
const outImgPath=path.join(__dirname,'../../data/out.png');
const resImgPath=path.join(__dirname,'../../data/res.png');


export const giveModifiedImage =async(name:string,inUrl:string)=>{
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
  const inImage = await Jimp.read(inUrl);
  const outImage= await Jimp.read(outImgPath);

  inImage.resize(100,100).circle();

  outImage
  .resize(300,150)
  .blit(inImage,20,23) // 
  .quality(100)
  .print(font, 150, 30, {text:name.length>15?name.slice(0,13)+"...":name})
  .write(resImgPath);

  return resImgPath;
}