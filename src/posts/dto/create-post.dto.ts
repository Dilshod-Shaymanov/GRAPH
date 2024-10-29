import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field()
  content: string;
}
