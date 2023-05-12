import { Injectable } from "@nestjs/common";
import { City } from "src/modules/models/Region/City.entity";
import { BasePrefecture } from "../prefecture/BasePrefecture.service";
import { BaseCity } from "./BaseCity.service";

@Injectable()
export class AddCity extends BaseCity {
	async execute(newCity: City) {
		return this.repo().save(newCity);
	}
}
