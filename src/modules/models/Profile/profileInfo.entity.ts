import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";
import { ProfileBookmarks } from "./ProfileBookmarks.entity";
import { ProfileLikes } from "./ProfileLikes.entity";

@ObjectType()
export class ProfileInfo {
	constructor() {
		this.likes = new ProfileLikes();
		this.bookmarks = new ProfileBookmarks();
		this.totalViews = 0;
	}

	@Field({ defaultValue: 0 })
	@Column({ default: 0 })
	totalViews: number;

	@Field(() => ProfileLikes)
	@Column(() => ProfileLikes)
	likes: ProfileLikes;

	@Field(() => ProfileBookmarks)
	@Column(() => ProfileBookmarks)
	bookmarks: ProfileBookmarks;
}
