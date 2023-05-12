import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class AddLikeToProfile extends BaseProfile {
	async execute(profile: Profile, userId: string) {
		const likes = profile.profileInfo.likes;
		likes.total++;
		likes.users = [...likes.users, userId];
		return await this.repo().save(profile);
	}
}
