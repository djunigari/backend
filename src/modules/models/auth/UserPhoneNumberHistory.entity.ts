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
export class UserPhoneNumberHistory {
	@ObjectIdColumn()
	id: string;
	@Field(() => String)
	@Column()
	uid: string;
	@Field(() => String)
	@Column()
	fromPhoneNumber: string;
	@Field(() => String)
	@Column()
	toPhoneNumber: string;
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamp", nullable: true })
	updatedAt?: Date;
}
