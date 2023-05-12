import { Injectable } from "@nestjs/common";
import { PageInfo } from "src/graphql/response/PageInfo";
import { PaginatedTestimonial } from "src/graphql/response/PaginatedTestimonial";
import { Testimonial } from "src/modules/models/client/Testimonial.entity";
import { TestimonialStatus } from "src/modules/models/enums/TestimonialStatus.enum";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import { BaseTestimonial } from "./BaseTestimonial.service";

interface ISearchDto {
	userId?: string;
	profileUid?: string;
	status?: TestimonialStatus;
}

@Injectable()
export class FindTestimonialByParams extends BaseTestimonial {
	async execute(
		params?: ISearchDto,
		take?: number | 10,
		skip?: number | 0
	): Promise<PaginatedTestimonial> {
		const queryParams: MongoFindManyOptions<Testimonial> = {
			where: {},
			order: { profileUid: "DESC" },
			take: take,
			skip: skip,
		};

		if (params?.userId) queryParams.where.userId = { $eq: params.userId };
		if (params?.profileUid)
			queryParams.where.profileUid = { $eq: params.profileUid };
		if (params?.status) queryParams.where.status = { $eq: params.status };

		const [list, count] = await this.repo().findAndCountBy(queryParams);

		return {
			pageInfo: {
				totalCount: count,
				startCursor: skip,
				endCursor: skip + list.length,
				take,
				skip,
				hasPreviousPage: skip > 0 ? true : false,
				hasNextPage: skip + list.length < count ? true : false,
			} as PageInfo,
			list,
		};
	}
}
