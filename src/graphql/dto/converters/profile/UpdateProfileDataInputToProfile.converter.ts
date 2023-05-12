import { Injectable } from "@nestjs/common";
import { Attendance } from "src/modules/models/enums/attendance.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { ProfileAddress } from "src/modules/models/Profile/ProfileAddress.entity";
import { UpdateProfileDataInput } from "../../profile/update-profile.input";

@Injectable()
export class UpdateProfileDataInputToProfile {
	constructor() {}

	async execute(data: UpdateProfileDataInput) {
		const profile = new Profile();
		profile.displayName = data.displayName || "";
		profile.imageUrl = data.imageUrl || "";
		profile.email = data.email || "";
		profile.telephone = data.telephone || "";
		profile.whatsapp = data.whatsapp || "";
		profile.facebook = data.facebook || "";
		profile.instagram = data.instagram || "";
		profile.webSite = data.webSite || "";
		profile.youtube = data.youtube || "";
		profile.attendances =
			data.attendances?.map((a) => Attendance[a.toUpperCase()]) || [];
		profile.category = data.category || "";
		profile.subCategory = data.subCategory || "";
		profile.services = data.services || [];
		profile.description = data.description || "";
		profile.notesAndComments = data.notesAndComments || "";

		const address = new ProfileAddress();
		address.country = data.country;
		address.postCode = data.postCode;
		address.prefCode = data.prefCode;
		address.cityCode = data.cityCode;
		address.address1 = data.address1;
		address.address2 = data.address2;

		profile.address = address;

		return profile;
	}
}
