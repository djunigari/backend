import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParamsRandomAnnouncementsFilterInput {
	@Field({ nullable: true })
	prefectureCode?: string;
	@Field({ nullable: true })
	cityCode?: string;
	@Field({ nullable: true })
	category?: string;
	@Field({ nullable: true })
	subCategory?: string;
}
