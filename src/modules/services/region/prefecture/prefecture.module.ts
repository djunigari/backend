import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { AddPrefecture } from "./AddPrefecture.service";
import { AddPrefectures } from "./AddPrefectures.service";
import { BasePrefecture } from "./BasePrefecture.service";
import { FindAll } from "./FindAll.service";
import { FindByPrefCode } from "./FindByPrefCode.service";
import { UpdatePrefecture } from "./UpdatePrefecture.service";

@Module({
	imports: [TypeOrmModule.forFeature([Prefecture])],
	providers: [
		BasePrefecture,
		FindByPrefCode,
		FindAll,
		AddPrefectures,
		AddPrefecture,
		UpdatePrefecture,
	],
	exports: [
		AddPrefectures,
		AddPrefecture,
		FindByPrefCode,
		FindAll,
		UpdatePrefecture,
	],
})
export class PrefectureModule {}
