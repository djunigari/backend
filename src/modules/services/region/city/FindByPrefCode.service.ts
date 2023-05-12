import { Injectable } from "@nestjs/common";
import { BaseCity } from "./BaseCity.service";

@Injectable()
export class FindByPrefCode extends BaseCity {
	execute(prefCode: string) {
		return this.repo().find({
			where: { prefCode },
			order: { name: "ASC" },
		});
	}
}
