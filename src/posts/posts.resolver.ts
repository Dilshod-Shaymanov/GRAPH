
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersResolver } from "../users/users.resolver";
import { Posts } from "./entities/post.entity";

@Resolver("posts")
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly userResolver: UsersResolver
  ) {}

  @Mutation(() => Posts)
  async createPost(
    @Args("createPost") createPostDto: CreatePostDto,
    @Args("authorId") authorId: number
  ) {
    const author = await this.userResolver.findOneUser(authorId);
    return this.postsService.createUser(createPostDto, author);
  }

  @Query(() => [Posts])
  findAllPost() {
    return this.postsService.findAll();
  }

  @Query(() => Posts)
  findOnePost(@Args("id") id: number) {
    return this.postsService.findOne(+id);
  }

  @Mutation(() => Posts)
  updatePost(
    @Args("id") id: number,
    @Args("updatePost") updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Query(() => ID)
  async removePost(@Args("id") id: number) {
    this.postsService.remove(+id);
    return id;
  }
}
