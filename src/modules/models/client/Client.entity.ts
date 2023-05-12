import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ProfileResume } from "./ProfileResume.entity";

@ObjectType()
@Entity()
export class Client {
	constructor() {
		this.likes = [];
		this.bookmarks = [];
		this.testimonials = [];
	}

	@ObjectIdColumn()
	_id: string;

	@Field(() => String)
	@Column({ unique: true })
	userId: string;

	@Field(() => [ProfileResume], { nullable: true })
	@Column({ nullable: true, default: [] })
	likes?: ProfileResume[];

	@Field(() => [ProfileResume], { nullable: true })
	@Column({ nullable: true, default: [] })
	bookmarks?: ProfileResume[];

	@Field(() => [ProfileResume], { nullable: true })
	@Column({ nullable: true, default: [] })
	testimonials?: ProfileResume[];
}
