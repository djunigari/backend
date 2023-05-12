import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class ProfileAddress {
	constructor() {
		this.country = "Japan";
	}

	@Field({ nullable: true })
	@Column({ nullable: true })
	country?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	postCode?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	prefCode?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	prefName?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	cityCode?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	cityName?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	address1?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	address2?: string;
}
