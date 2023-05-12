import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCityNameInput {
	@Field(() => String)
	name: string;
	@Field(() => String)
	admAreaCode: string;
}
