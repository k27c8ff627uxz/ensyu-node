import { PrismaClient, MyUser } from '@prisma/client'

const prisma = new PrismaClient()

const newData: MyUser = {
  id: 0,
  email: 'myemail',
  name: 'myname',
};

prisma.myUser.create({data: newData})
  .then((value) => console.log(value));
