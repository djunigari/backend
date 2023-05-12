import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class ProfileBookmarks {
	constructor() {
		this.total = 0;
		this.users = [];
	}

	@Field({ defaultValue: 0 })
	@Column({ default: 0 })
	total: number;

	@Field(() => [String], { nullable: true, defaultValue: [] })
	@Column({ nullable: true })
	users: string[];
}
