import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
@Entity()
export class Post {
	constructor() {
		this.id = uuidv4();
	}

	@ObjectIdColumn()
	_id: string;

	@Field(() => ID)
	@PrimaryColumn({ unique: true })
	id: string;

	@Field()
	@Column()
	slug: string;

	@Field()
	@Column()
	title: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	content?: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamp", nullable: true })
	updatedAt?: Date;
}
