import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProfileDataInput {
	@Field(() => String, { nullable: true })
	typeProfile?: string;
	@Field({ nullable: true })
	displayName?: string;
	@Field({ nullable: true })
	imageUrl?: string;
	@Field({ nullable: true })
	email?: string;
	@Field({ nullable: true })
	telephone?: string;
	@Field({ nullable: true })
	whatsapp?: string;
	@Field({ nullable: true })
	facebook?: string;
	@Field({ nullable: true })
	instagram?: string;
	@Field({ nullable: true })
	webSite?: string;
	@Field({ nullable: true })
	youtube?: string;
	@Field(() => [String], { nullable: true })
	attendances?: string[];
	@Field({ nullable: true })
	category?: string;
	@Field({ nullable: true })
	subCategory?: string;
	@Field(() => [String], { nullable: true })
	services?: string[];
	@Field({ nullable: true })
	description?: string;
	@Field({ nullable: true })
	notesAndComments?: string;

	@Field({ nullable: true })
	country?: string;

	@Field({ nullable: true })
	postCode?: string;

	@Field({ nullable: true })
	prefCode?: string;

	@Field({ nullable: true })
	cityCode?: string;

	@Field({ nullable: true })
	address1?: string;

	@Field({ nullable: true })
	address2?: string;
}
