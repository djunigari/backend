import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewCityInput {
	@Field(() => String, { nullable: true })
	name: string;

	@Field(() => String)
	nameJP: string;

	@Field(() => String)
	prefCode: string;

	@Field(() => String)
	admAreaCode: string;
}
