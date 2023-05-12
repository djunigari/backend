import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BasePrefecture {
	constructor(
		@InjectRepository(Prefecture)
		private repository: MongoRepository<Prefecture>
	) {}
	repo() {
		return this.repository;
	}
}
