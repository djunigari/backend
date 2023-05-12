import { Injectable } from "@nestjs/common";
import { BasePrefecture } from "./BasePrefecture.service";

@Injectable()
export class FindAll extends BasePrefecture {
	async execute() {
		return this.repo().find({ order: { name: "ASC" } });
	}
}
