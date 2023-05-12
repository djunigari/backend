import { Injectable } from "@nestjs/common";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { BasePrefecture } from "./BasePrefecture.service";

@Injectable()
export class AddPrefecture extends BasePrefecture {
	async execute(newPrefecture: Prefecture) {
		return this.repo().save(newPrefecture);
	}
}
