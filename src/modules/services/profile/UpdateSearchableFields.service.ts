import { Injectable } from "@nestjs/common";
import { Profile } from "src/modules/models/Profile/profile.entity";

@Injectable()
export class UpdateSearchableFields {
	normalizeString(input: string): string {
		return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	async execute(profile: Profile) {
		const displayNameSanitized = this.normalizeString(profile.displayName);
		const categorySanitized = this.normalizeString(profile.category);
		const subCategorySanitized = this.normalizeString(profile.subCategory);
		const servicesSanitized = this.normalizeString(
			profile.services.join(" , ")
		);

		const displayName = `start_displayName:'${
			displayNameSanitized || ""
		}'end_displayName,`;
		const category = `start_category:'${
			categorySanitized || ""
		}'end_category,`;
		const subCategory = `start_subCategory: '${
			subCategorySanitized || ""
		}'end_subCategory,`;
		const services = `start_services:'${
			servicesSanitized || ""
		}'end_services,`;
		const address = `start_address:'${profile.address.prefName || ""} ${
			profile.address.cityName || ""
		} ${profile.address.address1 || ""} ${
			profile.address.address2 || ""
		}'end_address,`;

		profile.searchableFields = `${displayName} ${category} ${subCategory} ${services} ${address}`;

		return profile;
	}
}
