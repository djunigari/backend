import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { Attendance } from "../enums/attendance.enum";
import { TypeProfile } from "../enums/typeProfile.enum";
import { ProfileAddress } from "./ProfileAddress.entity";
import { ProfileInfo } from "./profileInfo.entity";

@ObjectType()
@Entity()
export class Profile {
	constructor() {
		this.profileInfo = new ProfileInfo();
		this.address = new ProfileAddress();
	}

	@ObjectIdColumn()
	_id: string;

	@Field(() => ID)
	@PrimaryColumn({ unique: true })
	uid: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	linkName?: string;

	@Field()
	@Column({ default: TypeProfile.FREE })
	typeProfile?: TypeProfile = TypeProfile.FREE;

	@Field()
	@Column({ default: false })
	disabled?: boolean = false;

	@Field({ nullable: true })
	@Column({ nullable: true })
	displayName?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	imageUrl?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	telephone?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	whatsapp?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	facebook?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	instagram?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	webSite?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	youtube?: string;

	@Field(() => [String], { nullable: "itemsAndList" })
	@Column("simple-array", { nullable: true })
	attendances?: Attendance[];

	@Field({ nullable: true })
	@Column({ nullable: true })
	category?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	subCategory?: string;

	@Field(() => [String], { nullable: true })
	@Column("simple-array", { nullable: true })
	services?: string[];

	@Field({ nullable: true })
	@Column({ nullable: true })
	description?: string;

	@Field({ nullable: true })
	@Column({ nullable: true })
	notesAndComments?: string;

	@Field(() => ProfileInfo, { nullable: true })
	@Column(() => ProfileInfo)
	profileInfo: ProfileInfo;

	@Field(() => ProfileAddress)
	@Column(() => ProfileAddress)
	address: ProfileAddress;

	// Performing a diacritics-insensitive $regex search in MongoDB
	// https://stackoverflow.com/questions/71096482/performing-a-diacritics-insensitive-regex-search-in-mongodb
	//https://www.reddit.com/r/mongodb/comments/srnbvj/performing_a_diacriticsinsensitive_regex_search/
	// Temporary Solution: Created Sanitized Attributes. However the best implementation is chaging mongoDB to SQL DataBase
	@Field({ nullable: true })
	@Column({ nullable: true })
	searchableFields?: string;
}
