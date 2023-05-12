import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Prefecture } from "src/modules/models/Region/Prefecture.entity";
import { AddPrefecture } from "src/modules/services/region/prefecture/AddPrefecture.service";
import { AddPrefectures } from "src/modules/services/region/prefecture/AddPrefectures.service";
import { FindAll } from "src/modules/services/region/prefecture/FindAll.service";
import { FindByPrefCode } from "src/modules/services/region/prefecture/FindByPrefCode.service";
import { UpdatePrefecture } from "src/modules/services/region/prefecture/UpdatePrefecture.service";
import { NewPrefectureInput } from "../dto/region/new-prefecture.input";

@Resolver(() => Prefecture)
export class PrefectureResolver {
	constructor(
		private findByPrefCode: FindByPrefCode,
		private findAll: FindAll,
		private add: AddPrefecture,
		private addList: AddPrefectures,
		private update: UpdatePrefecture
	) {}

	// @UseGuards(AdminRoleGuard)
	@Mutation(() => Prefecture)
	addPrefecture(@Args("data") data: NewPrefectureInput) {
		const pref = new Prefecture();
		pref.name = data.name;
		pref.nameJP = data.nameJP;
		pref.prefCode = data.prefCode;
		return this.add.execute(pref);
	}

	@Mutation(() => [Prefecture])
	addPrefectures(
		@Args("data", { type: () => [NewPrefectureInput] })
		data: NewPrefectureInput[]
	) {
		const prefectures = data.map((p) => {
			const pref = new Prefecture();
			pref.name = p.name;
			pref.nameJP = p.nameJP;
			pref.prefCode = p.prefCode;
			return pref;
		});

		return this.addList.execute(prefectures);
	}

	// @UseGuards(AdminRoleGuard)
	@Mutation(() => Prefecture)
	async updatePrefectureName(
		@Args("name", { type: () => String }) name: string,
		@Args("prefCode", { type: () => String }) prefCode: string
	) {
		const oldPref = await this.findByPrefCode.execute(prefCode);
		if (!oldPref) throw new Error("Prefecture do not exist!");
		return this.update.execute(oldPref, { name } as Prefecture);
	}

	@Query(() => Prefecture, { nullable: true })
	searchPrefecture(
		@Args("prefCode", { type: () => String }) prefCode: string
	) {
		return this.findByPrefCode.execute(prefCode);
	}

	@Query(() => [Prefecture])
	prefectures() {
		return this.findAll.execute();
	}
}
