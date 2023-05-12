import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class CreateProfile extends BaseProfile {
	async execute(newProfile: Profile) {
		const p = await this.updateSearchableField(newProfile);
		return this.repo().save(p);
	}
}
