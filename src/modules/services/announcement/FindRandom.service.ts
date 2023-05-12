import { Injectable } from "@nestjs/common";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

interface IRandomAnnouncementsDto {
	prefectureCode?: string;
	cityCode?: string;
	category?: string;
	subCategory?: string;
}

@Injectable()
export class FindRandomAnnouncement extends BaseAnnouncement {
	execute(limit: number, params?: IRandomAnnouncementsDto) {
		const query: any = {};
		if (params?.prefectureCode)
			query.prefectureCode = { $eq: params.prefectureCode };
		if (params?.cityCode) query.cityCode = { $eq: params.cityCode };
		if (params?.category) query.category = { $eq: params.category };
		if (params?.subCategory)
			query.subCategory = { $eq: params.subCategory };

		const res = this.repo().aggregate<Announcement>([
			{
				$match: query,
			},
			{
				$sample: { size: limit },
			},
		]);
		return res.toArray();
	}
}
