import { Injectable } from "@nestjs/common";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { BasePrefecture } from "./BasePrefecture.service";

@Injectable()
export class UpdatePrefecture extends BasePrefecture {
	async execute(oldPrefecture: Prefecture, newPrefecture: Prefecture) {
		return this.repo().save({
			...oldPrefecture,
			...newPrefecture,
		});
	}
}
