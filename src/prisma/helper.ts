import prisma from ".";

export const getCustomUserInfo =async(authorId:string)=>{
  // Account providerAccountId
  const {userId} = await prisma.account.findFirst({
    where:{
      providerAccountId:authorId,
    },
    select:{
      userId: true,
    }
  }) ?? {};

  if(!userId) return ['',''];

  const {tweet,cardImage}= await prisma.user.findFirst({
    where:{
      id:userId,
    },select:{
      tweet:true,
      cardImage:true,
    }
  }) ?? {};

  return [cardImage,tweet];
}