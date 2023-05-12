import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class AddViewToProfile extends BaseProfile {
	async execute(profile: Profile) {
		if (!profile) return;
		profile.profileInfo.totalViews++;
		try {
			await this.repo().save(profile);
		} catch (error) {
			console.log(error.message);
			return;
		}
	}
}
