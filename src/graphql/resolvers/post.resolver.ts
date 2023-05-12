import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { AdminRoleGuard } from "src/auth/guards/admin-role.guard";
import { Post } from "src/modules/models/Post/Post.entity";
import { CreatePost } from "src/modules/services/post/CreatePost.service";
import { DeletePost } from "src/modules/services/post/DeletePost.service";
import { FindPostById } from "src/modules/services/post/FindPostById.service";
import { FindPostBySlug } from "src/modules/services/post/FindPostBySlug.service";
import { FindPostsByParams } from "src/modules/services/post/FindPostsByParams.service";
import { UpdatePost } from "src/modules/services/post/UpdatePost.service";
import { ParamsPostFilterInput } from "../dto/post/search-post.input";
import { PaginatedProfiles } from "../response/PaginatedResponse";

@Resolver(() => Post)
export class PostResolver {
	constructor(
		private findByParams: FindPostsByParams,
		private findById: FindPostById,
		private findBySlug: FindPostBySlug,
		private create: CreatePost,
		private update: UpdatePost,
		private remove: DeletePost
	) {}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => Post)
	async createPost(
		@Args("slug") slug: string,
		@Args("title") title: string,
		@Args("content") content: string
	) {
		const founded = await this.findBySlug.execute(slug);

		if (founded) throw new GraphQLError(`Post already exist!`);

		const post = new Post();
		post.slug = slug.trim().toLowerCase();
		post.title = title;
		post.content = content;

		return this.create.execute(post);
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => Post)
	async updatePost(
		@Args("id") id: string,
		@Args("slug") slug: string,
		@Args("title") title: string,
		@Args("content") content: string
	) {
		const founded = await this.findById.execute(id);
		if (!founded) throw new GraphQLError("Post does not exist!");

		return this.update.execute(founded, {
			slug: slug.trim().toLowerCase(),
			title,
			content,
		} as Post);
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => String)
	async deletePost(@Args("id") id: string) {
		const res = await this.remove.execute(id);
		return `id:{${id}}, post deleted - quantity of deleted: ${res.affected}`;
	}

	@Query(() => Post, { nullable: true })
	post(@Args("slug") slug: string) {
		return this.findBySlug.execute(slug);
	}

	@Query(() => PaginatedProfiles)
	searchPost(
		@Args("params", { nullable: true }) params: ParamsPostFilterInput,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number
	) {
		return this.findByParams.execute(
			{
				slug: params?.slug,
				title: params?.title,
				content: params?.content,
			},
			take,
			skip
		);
	}
}
