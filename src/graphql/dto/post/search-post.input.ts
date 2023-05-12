import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ParamsPostFilterInput {
	@Field({ nullable: true })
	slug?: string;
	@Field({ nullable: true })
	title?: string;
	@Field({ nullable: true })
	content?: string;
}
