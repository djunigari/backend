import { Injectable } from "@nestjs/common";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { BasePrefecture } from "./BasePrefecture.service";

@Injectable()
export class AddPrefectures extends BasePrefecture {
	async execute(prefectures: Prefecture[]) {
		return this.repo().save(prefectures);
	}
}
