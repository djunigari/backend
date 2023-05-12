import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "src/modules/models/Region/City.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BaseCity {
	constructor(
		@InjectRepository(City)
		private repository: MongoRepository<City>
	) {}
	repo() {
		return this.repository;
	}
}
