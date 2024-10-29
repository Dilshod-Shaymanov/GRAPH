import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";

@Resolver("users")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args("createUser") createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User])
  findAllUser() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args("id", { type: () => ID }) id: number) {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  updateUser(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateUser") updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Mutation(() => ID)
  removeUser(@Args("id", { type: () => ID }) id: number) {
    return this.usersService.remove(+id);
  }
}
