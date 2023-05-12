import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "src/modules/models/Post/Post.entity";
import { PageInfo } from "./PageInfo";

@ObjectType()
export class PaginatedPosts {
	@Field(() => PageInfo)
	pageInfo: PageInfo;

	@Field(() => [Post])
	list: Post[];
}
