import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SimpleData {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
