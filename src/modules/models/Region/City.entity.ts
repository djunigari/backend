import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class City {
	@ObjectIdColumn()
	_id: string;

	@Field()
	@PrimaryColumn({ unique: true })
	admAreaCode: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	name?: string;

	@Field()
	@Column()
	nameJP: string;

	@Field()
	@Column()
	prefCode: string;
}
