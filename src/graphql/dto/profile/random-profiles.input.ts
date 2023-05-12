import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParamsRandomProfileFilterInput {
	@Field(() => [String], { nullable: true })
	typeProfiles?: string[];
	@Field(() => [String], { nullable: true })
	attendances?: string[];
	@Field({ nullable: true })
	category?: string;
	@Field({ nullable: true })
	subCategory?: string;

	@Field({ nullable: true })
	prefCode?: string;
	@Field({ nullable: true })
	cityCode?: string;
}
