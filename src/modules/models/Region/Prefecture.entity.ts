import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { City } from "./City.entity";

@ObjectType()
@Entity()
export class Prefecture {
	@ObjectIdColumn()
	_id: string;

	@Field()
	@PrimaryColumn({ unique: true })
	prefCode: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	name?: string;

	@Field()
	@Column()
	nameJP: string;
}
