import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class AddBookmarkToProfile extends BaseProfile {
	async execute(profile: Profile, userId: string) {
		const bookmarks = profile.profileInfo.bookmarks;
		bookmarks.total++;
		bookmarks.users = [...bookmarks.users, userId];
		return await this.repo().save(profile);
	}
}
