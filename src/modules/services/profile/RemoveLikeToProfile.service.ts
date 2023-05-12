import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class RemoveLikeToProfile extends BaseProfile {
	async execute(profile: Profile, userId: string) {
		const likes = profile.profileInfo.likes;
		likes.total--;
		likes.users = likes.users?.filter((i) => i !== userId) || [];
		return await this.repo().save(profile);
	}
}
