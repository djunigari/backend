import { Injectable } from "@nestjs/common";
import { BaseProfile } from "./BaseProfile.service";

@Injectable()
export class UpdateTemp extends BaseProfile {
	async execute() {
		const profiles = await this.repo().find();
		profiles.forEach(async (p) => {});
	}
}
