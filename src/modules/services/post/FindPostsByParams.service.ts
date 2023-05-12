import { Injectable } from "@nestjs/common";
import { PageInfo } from "src/graphql/response/PageInfo";
import { PaginatedPosts } from "src/graphql/response/PaginatedPosts";
import { Post } from "src/modules/models/Post/Post.entity";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import { BasePost } from "./BasePost.service";

interface ISearchPostsDto {
	slug?: string;
	title?: string;
	content?: string;
}

@Injectable()
export class FindPostsByParams extends BasePost {
	async execute(
		params?: ISearchPostsDto,
		take?: number | 10,
		skip?: number | 0
	): Promise<PaginatedPosts> {
		const queryParams: MongoFindManyOptions<Post> = {
			where: {},
			order: { title: "DESC" },
			take: take,
			skip: skip,
		};

		if (params?.slug) queryParams.where.slug = { $eq: params.slug };
		if (params?.title) queryParams.where.title = { $eq: params.title };
		if (params?.content)
			queryParams.where.content = { $eq: params.content };

		const [posts, count] = await this.repo().findAndCount(queryParams);

		return {
			pageInfo: {
				totalCount: count,
				startCursor: skip,
				endCursor: skip + posts.length,
				take,
				skip,
				hasPreviousPage: skip > 0 ? true : false,
				hasNextPage: skip + posts.length < count ? true : false,
			} as PageInfo,
			list: posts,
		};
	}
}
