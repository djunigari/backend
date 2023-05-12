import { Injectable } from "@nestjs/common";
import { PageInfo } from "src/graphql/response/PageInfo";
import { PaginatedAnnouncements } from "src/graphql/response/PaginatedAnnouncement";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

@Injectable()
export class FindAllAnnouncement extends BaseAnnouncement {
	async execute(
		uid: string,
		take?: number | 10,
		skip?: number | 0
	): Promise<PaginatedAnnouncements> {
		const [list, count] = await this.repo().findAndCount({
			where: { uid },
		});

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
