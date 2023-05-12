import { Injectable } from "@nestjs/common";
import { Attendance } from "src/modules/models/enums/attendance.enum";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

interface IRandomProfilesDto {
	typeProfiles?: TypeProfile[];
	attendances?: Attendance[];
	category?: string;
	subCategory?: string;
	prefCode?: string;
	cityCode?: string;
}

@Injectable()
export class FindRandomProfiles extends BaseProfile {
	async execute(limit: number, params?: IRandomProfilesDto) {
		const query: any = { disabled: false };

		if (params?.typeProfiles?.length > 0)
			query.typeProfile = { $in: [...params.typeProfiles] };
		if (params?.attendances?.length > 0)
			query.attendances = { $in: [...params.attendances] };
		if (params?.category) query.category = { $eq: params.category };
		if (params?.subCategory)
			query.subCategory = { $eq: params.subCategory };
		if (params?.prefCode)
			query["address.prefCode"] = { $eq: params.prefCode };
		if (params?.cityCode)
			query["address.cityCode"] = { $eq: params.cityCode };

		const res = this.repo().aggregate<Profile>([
			{
				$match: query,
			},
			{
				$sample: { size: limit },
			},
		]);
		return await res.toArray();
	}
}
