import { Injectable } from "@nestjs/common";
import { PageInfo } from "src/graphql/response/PageInfo";
import { PaginatedProfiles } from "src/graphql/response/PaginatedResponse";
import { Attendance } from "src/modules/models/enums/attendance.enum";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import { BaseProfile } from "./BaseProfile.service";

interface ISearchProfilesDto {
	uid?: string;
	typeProfiles?: TypeProfile[];
	displayName?: string;
	attendances?: Attendance[];
	category?: string;
	subCategory?: string;
	services?: string[];
	prefCode?: string;
	cityCode?: string;
	query?: string;
}

@Injectable()
export class FindProfilesByParams extends BaseProfile {
	createPattern(attr: string, value: string) {
		return `start_${attr}:'[\\s\\S]*${value}[\\s\\S]*'end_${attr},`;
	}

	createRegex(value: string) {
		const patterns = [
			this.createPattern("displayName", value),
			this.createPattern("category", value),
			this.createPattern("subCategory", value),
			this.createPattern("services", value),
			this.createPattern("address", value),
		];

		return patterns.join("|");
	}

	async execute(
		params?: ISearchProfilesDto,
		take?: number | 10,
		skip?: number | 0
	): Promise<PaginatedProfiles> {
		const queryParams: MongoFindManyOptions<Profile> = {
			where: {
				disabled: false,
			},
			order: { displayName: "ASC" },
			take: take,
			skip: skip,
		};

		if (params?.query?.trim()) {
			const values = params?.query?.trim().split(/\s+/);
			const andConditions = values.map((word) => {
				const r = this.createRegex(word);
				const regex = new RegExp(r, "i");
				return { searchableFields: { $regex: regex } };
			});

			queryParams.where.$and = andConditions;
		}

		if (params?.uid) queryParams.where.uid = { $eq: params.uid };
		if (params?.typeProfiles?.length > 0)
			queryParams.where.typeProfile = { $in: [...params.typeProfiles] };
		if (params?.displayName)
			queryParams.where.searchableFields = new RegExp(
				this.createPattern("displayName", params.displayName),
				"i"
			);
		if (params?.attendances?.length > 0)
			queryParams.where.attendances = { $in: [...params.attendances] };

		if (params?.category)
			queryParams.where.category = new RegExp(
				`^${params.category}$`,
				"i"
			);
		if (params?.subCategory)
			queryParams.where.subCategory = new RegExp(
				`^${params.subCategory}$`,
				"i"
			);
		if (params?.services?.length > 0) {
			const andConditions = params.services.map((word) => {
				const r = this.createPattern("services", word);
				const regex = new RegExp(r, "i");
				return { searchableFields: { $regex: regex } };
			});
			queryParams.where.$and = andConditions;
		}
		if (params?.prefCode)
			queryParams.where["address.prefCode"] = { $eq: params.prefCode };
		if (params?.cityCode)
			queryParams.where["address.cityCode"] = { $eq: params.cityCode };

		const [profiles, count] = await this.repo().findAndCount(queryParams);

		return {
			pageInfo: {
				totalCount: count,
				startCursor: skip,
				endCursor: skip + profiles.length,
				take,
				skip,
				hasPreviousPage: skip > 0 ? true : false,
				hasNextPage: skip + profiles.length < count ? true : false,
			} as PageInfo,
			list: profiles,
		};
	}
}
