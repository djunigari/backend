import { Field, ObjectType } from "@nestjs/graphql";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { PageInfo } from "./PageInfo";

@ObjectType()
export class PaginatedAnnouncements {
	@Field(() => PageInfo)
	pageInfo: PageInfo;

	@Field(() => [Announcement])
	list: Announcement[];
}
