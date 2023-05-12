import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchRecord } from "src/modules/models/SearchRecord.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BaseSearchRecord {
	constructor(
		@InjectRepository(SearchRecord)
		private repository: MongoRepository<SearchRecord>
	) {}
	repo() {
		return this.repository;
	}
}
