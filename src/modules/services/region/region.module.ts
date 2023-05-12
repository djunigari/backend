import { Module } from "@nestjs/common";
import { CityModule } from "./city/city.module";
import { PrefectureModule } from "./prefecture/prefecture.module";

@Module({
	imports: [CityModule, PrefectureModule],
	exports: [CityModule, PrefectureModule],
})
export class RegionModule {}
