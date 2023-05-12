import { Field, ObjectType } from "@nestjs/graphql";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { PageInfo } from "./PageInfo";

@ObjectType()
export class PaginatedProfiles {
	@Field(() => PageInfo)
	pageInfo: PageInfo;

	@Field(() => [Profile])
	list: Profile[];
}
