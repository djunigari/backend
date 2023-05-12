import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";

@ObjectType()
export class ProfileResume {
	@Field()
	@Column()
	uid: string;

	@Field()
	@Column()
	imageUrl?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	displayName?: string;
}
