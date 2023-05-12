import { Injectable } from "@nestjs/common";
import { City } from "src/modules/models/Region/City.entity";
import { BaseCity } from "./BaseCity.service";

@Injectable()
export class UpdateCity extends BaseCity {
	async execute(oldCity: City, newCity: City) {
		return this.repo().save({
			...oldCity,
			...newCity,
		});
	}
}
