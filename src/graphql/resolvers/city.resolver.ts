import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { City } from "src/modules/models/Region/City.entity";
import { AddCities } from "src/modules/services/region/city/AddCities.service";
import { AddCity } from "src/modules/services/region/city/AddCity.service";
import { FindAll } from "src/modules/services/region/city/FindAll.service";
import { FindByAdmAreaCode } from "src/modules/services/region/city/FindByAdmAreaCode.service";
import { FindByPrefCode } from "src/modules/services/region/city/FindByPrefCode.service";
import { UpdateCity } from "src/modules/services/region/city/UpdateCity.service";
import { NewCityInput } from "../dto/region/new-city.input";
import { UpdateCityNameInput } from "../dto/region/update-city-name.input";

@Resolver(() => City)
export class CityResolver {
	constructor(
		private findByAdmAreaCode: FindByAdmAreaCode,
		private findByPrefCode: FindByPrefCode,
		private findAll: FindAll,
		private add: AddCity,
		private addList: AddCities,
		private update: UpdateCity
	) {}

	// @UseGuards(AdminRoleGuard)
	@Mutation(() => City)
	addCity(@Args("data") data: NewCityInput) {
		const city = new City();
		city.name = data.name;
		city.nameJP = data.nameJP;
		city.prefCode = data.prefCode;
		city.admAreaCode = data.admAreaCode;

		return this.add.execute(city);
	}

	@Mutation(() => [City])
	addCities(
		@Args("data", { type: () => [NewCityInput] }) data: NewCityInput[]
	) {
		const cities = data.map((c) => {
			const city = new City();
			city.name = c.name;
			city.nameJP = c.nameJP;
			city.prefCode = c.prefCode;
			city.admAreaCode = c.admAreaCode;
			return city;
		});

		return this.addList.execute(cities);
	}

	// @UseGuards(AdminRoleGuard)
	@Mutation(() => City)
	async updateCityName(
		@Args("name", { type: () => String }) name: string,
		@Args("admAreaCode", { type: () => String }) admAreaCode: string
	) {
		const oldCity = await this.findByAdmAreaCode.execute(admAreaCode);
		if (!oldCity) throw new Error("City do not exist!");
		return this.update.execute(oldCity, { name } as City);
	}

	@Mutation(() => [City])
	updateCitiesName(
		@Args("data", { type: () => [UpdateCityNameInput] })
		data: UpdateCityNameInput[]
	) {
		return data.map(async (c) => {
			const oldCity = await this.findByAdmAreaCode.execute(c.admAreaCode);
			const city = await this.update.execute(oldCity, {
				name: c.name,
			} as City);
			return city;
		});
	}

	@Query(() => City, { nullable: true })
	searchCity(
		@Args("admAreaCode", { type: () => String }) admAreaCode: string
	) {
		return this.findByAdmAreaCode.execute(admAreaCode);
	}

	@Query(() => [City])
	cities() {
		return this.findAll.execute();
	}

	@Query(() => [City])
	citiesFromPrefecture(
		@Args("prefCode", { type: () => String }) prefCode: string
	) {
		return this.findByPrefCode.execute(prefCode);
	}
}
