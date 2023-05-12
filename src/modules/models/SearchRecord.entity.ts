import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class SearchRecord {
	@ObjectIdColumn()
	_id: string;

	@Field(() => String)
	@Column()
	ip: string;

	@Field(() => String)
	@Column()
	params: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
}
