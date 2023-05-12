import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn,
} from "typeorm";
import { AnnouncementInfo } from "./AnnouncementInfo.entity";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
@Entity()
export class Announcement {
	constructor() {
		this.announcementInfo = new AnnouncementInfo();
		this.id = uuidv4();
	}

	@ObjectIdColumn()
	_id: string;

	@Field(() => ID)
	@Column()
	id: string;

	@Field()
	@Column()
	uid: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	imageUrl: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	url?: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamp", nullable: true })
	updatedAt?: Date;

	@Field(() => AnnouncementInfo, { nullable: true })
	@Column(() => AnnouncementInfo)
	announcementInfo: AnnouncementInfo;
}
