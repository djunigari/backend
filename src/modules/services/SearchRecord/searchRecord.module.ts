import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SearchRecord } from "src/modules/models/SearchRecord.entity";
import { BaseSearchRecord } from "./BaseSearchRecord";
import { CreateSearchRecord } from "./CreateSearchRecord";

@Module({
	imports: [TypeOrmModule.forFeature([SearchRecord])],
	providers: [BaseSearchRecord, CreateSearchRecord],
	exports: [CreateSearchRecord],
})
export class SearchRecordModule {}
