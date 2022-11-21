import Jimp from 'jimp';
import path from 'path';

const inImgPath=path.join(__dirname,'../../data/in.png');
const outImgPath=path.join(__dirname,'../../data/out.png');
const resImgPath=path.join(__dirname,'../../data/res.png');

console.log(inImgPath,outImgPath,resImgPath)



export const JimpTest=()=>{

  Jimp.read("https://pbs.twimg.com/profile_images/1594231937832431616/0L6uk24P_normal.png").then((inImg)=>{
      Jimp.read(outImgPath,async(err,outImg)=>{
        if(err) throw err;
    
        inImg.resize(100,100).circle();
      
        outImg
        .blit(inImg,100,100) // resize: ;
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(resImgPath);
      })
  })
  
  // Jimp.read({
  //   url: 'https://pbs.twimg.com/profile_images/1594231937832431616/0L6uk24P_normal.png',
  // }).then(inImg=>{
  //   Jimp.read(outImgPath,async(err,outImg)=>{
  //     if(err) throw err;
  
  //     inImg.contain(100, 100, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
    
  //     outImg
  //     .resize(256, 256)
  //     .blit(inImg,5,5) // resize: ;
  //     .quality(60) // set JPEG quality
  //     .greyscale() // set greyscale
  //     .write(resImgPath);
  //   })
  // });
}