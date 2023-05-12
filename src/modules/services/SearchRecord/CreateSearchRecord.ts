import { Injectable } from "@nestjs/common";
import { SearchRecord } from "src/modules/models/SearchRecord.entity";
import { BaseSearchRecord } from "./BaseSearchRecord";

@Injectable()
export class CreateSearchRecord extends BaseSearchRecord {
	async execute(newSearchRecord: SearchRecord) {
		return this.repo().save(newSearchRecord);
	}
}
