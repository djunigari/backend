import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParamsProfileFilterInput {
	@Field({ nullable: true })
	uid?: string;
	@Field(() => [String], { nullable: true })
	typeProfiles?: string[];
	@Field({ nullable: true })
	displayName?: string;
	@Field(() => [String], { nullable: true })
	attendances?: string[];
	@Field({ nullable: true })
	category?: string;
	@Field({ nullable: true })
	subCategory?: string;
	@Field(() => [String], { nullable: true })
	services?: string[];
	@Field({ nullable: true })
	prefCode?: string;
	@Field({ nullable: true })
	cityCode?: string;
	@Field({ nullable: true })
	query?: string;
}
