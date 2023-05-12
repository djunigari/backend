import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class AnnouncementInfo {
	constructor() {
		this.totalViews = 0;
		this.totalClicks = 0;
	}

	@Field({ defaultValue: 0 })
	@Column({ default: 0 })
	totalViews: number;

	@Field({ defaultValue: 0 })
	@Column({ default: 0 })
	totalClicks: number;
}
