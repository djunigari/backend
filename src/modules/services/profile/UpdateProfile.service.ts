import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class UpdateProfile extends BaseProfile {
	async execute(oldProfile: Profile, newProfile: Profile) {
		const p = await this.updateSearchableField(newProfile);
		return this.repo().save({
			...oldProfile,
			...p,
			disabled: oldProfile.disabled,
			profileInfo: oldProfile.profileInfo,
		});
	}
}
