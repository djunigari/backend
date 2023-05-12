import { Field, ObjectType } from "@nestjs/graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class PhoneNumber {
	@ObjectIdColumn()
	id: string;

	@Field(() => String)
	@Column()
	uid: string;
	@Field(() => String)
	@Column()
	phoneNumber: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamp", nullable: true })
	updatedAt?: Date;
}
