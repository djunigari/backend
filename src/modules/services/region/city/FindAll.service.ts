import { Injectable } from "@nestjs/common";
import { BaseCity } from "./BaseCity.service";

@Injectable()
export class FindAll extends BaseCity {
	async execute() {
		return this.repo().find({ order: { name: "ASC" } });
	}
}
