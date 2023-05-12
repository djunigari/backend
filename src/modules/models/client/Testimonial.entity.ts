import { Field, ObjectType } from "@nestjs/graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn,
} from "typeorm";
import { TestimonialStatus } from "../enums/TestimonialStatus.enum";

@ObjectType()
@Entity()
export class Testimonial {
	@ObjectIdColumn()
	_id: string;

	@Field(() => String)
	@Column()
	userId: string;

	@Field(() => String)
	@Column()
	profileUid: string;

	@Field(() => String)
	@Column()
	content: string;

	@Field()
	@Column({ default: TestimonialStatus.WAITING })
	status?: TestimonialStatus = TestimonialStatus.WAITING;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
	@Field()
	@UpdateDateColumn({ type: "timestamp", nullable: true })
	updatedAt?: Date;

	@Field(() => String, { nullable: true })
	@Column()
	userName?: string;
}
