import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class RemoveBookmarkToProfile extends BaseProfile {
	async execute(profile: Profile, userId: string) {
		const bookmarks = profile.profileInfo.bookmarks;
		bookmarks.total--;
		bookmarks.users = bookmarks.users.filter((i) => i !== userId);
		return await this.repo().save(profile);
	}
}
