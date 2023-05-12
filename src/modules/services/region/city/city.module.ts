import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/modules/models/Region/City.entity";
import { AddCities } from "./AddCities.service";
import { AddCity } from "./AddCity.service";
import { BaseCity } from "./BaseCity.service";
import { FindAll } from "./FindAll.service";
import { FindByAdmAreaCode } from "./FindByAdmAreaCode.service";
import { FindByPrefCode } from "./FindByPrefCode.service";
import { UpdateCity } from "./UpdateCity.service";

@Module({
	imports: [TypeOrmModule.forFeature([City])],
	providers: [
		BaseCity,
		FindByAdmAreaCode,
		FindAll,
		FindByPrefCode,
		AddCity,
		AddCities,
		UpdateCity,
	],
	exports: [
		AddCity,
		AddCities,
		FindByAdmAreaCode,
		FindAll,
		FindByPrefCode,
		UpdateCity,
	],
})
export class CityModule {}
