import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserRecord } from "firebase-admin/auth";
import { GraphQLError } from "graphql";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { AdminRoleGuard } from "src/auth/guards/admin-role.guard";
import { ClientAuthGuard } from "src/auth/guards/client-auth.guard";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { Account } from "src/modules/models/auth/Account.entity";
import { ProfileResume } from "src/modules/models/client/ProfileResume.entity";
import { Attendance } from "src/modules/models/enums/attendance.enum";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { SearchRecord } from "src/modules/models/SearchRecord.entity";
import { AddBookmark } from "src/modules/services/client/AddBookmark.service";
import { AddLike } from "src/modules/services/client/AddLike.service";
import { FindClientByUserId } from "src/modules/services/client/FindClientByUserId.service";
import { RemoveBookmark } from "src/modules/services/client/RemoveBookmark.service";
import { RemoveLike } from "src/modules/services/client/RemoveLike.service";
import { AddBookmarkToProfile } from "src/modules/services/profile/AddBookmarkToProfile.service";
import { AddLikeToProfile } from "src/modules/services/profile/AddLikeToProfile.service";
import { AddViewToProfile } from "src/modules/services/profile/AddViewToProfile.service";
import { CreateProfile } from "src/modules/services/profile/CreateProfile.service";
import { DeleteProfileByUid } from "src/modules/services/profile/DeleteProfile.service";
import { FindActivedProfileByUid } from "src/modules/services/profile/FindActivedProfileByUid.service";
import { FindProfileByUid } from "src/modules/services/profile/FindProfileByUid.service";
import { FindProfilesByParams } from "src/modules/services/profile/FindProfilesByParams.service";
import { FindRandomProfiles } from "src/modules/services/profile/FindRandomProfiles.service";
import { GenerateUid } from "src/modules/services/profile/GenerateUid.service";
import { RemoveBookmarkToProfile } from "src/modules/services/profile/RemoveBookmarkToProfile.service";
import { RemoveLikeToProfile } from "src/modules/services/profile/RemoveLikeToProfile.service";
import { UpdateProfile } from "src/modules/services/profile/UpdateProfile.service";
import { FindByAdmAreaCode } from "src/modules/services/region/city/FindByAdmAreaCode.service";
import { FindByPrefCode } from "src/modules/services/region/prefecture/FindByPrefCode.service";
import { CreateSearchRecord } from "src/modules/services/SearchRecord/CreateSearchRecord";
import { UpdateProfileDataInputToProfile } from "../dto/converters/profile/UpdateProfileDataInputToProfile.converter";
import { ParamsRandomProfileFilterInput } from "../dto/profile/random-profiles.input";
import { ParamsProfileFilterInput } from "../dto/profile/search-profiles.input";
import { UpdateProfileDataInput } from "../dto/profile/update-profile.input";
import { PaginatedProfiles } from "../response/PaginatedResponse";

@Resolver(() => Profile)
export class ProfileResolver {
	constructor(
		private findByUid: FindProfileByUid,
		private findActivedByUid: FindActivedProfileByUid,
		private findByParams: FindProfilesByParams,
		private findRandom: FindRandomProfiles,
		private create: CreateProfile,
		private update: UpdateProfile,
		private remove: DeleteProfileByUid,
		private generateUid: GenerateUid,
		private addView: AddViewToProfile,
		private addLikeToProfile: AddLikeToProfile,
		private removeLikeToProfile: RemoveLikeToProfile,
		private addBookmarkToProfile: AddBookmarkToProfile,
		private removeBookmarkToProfile: RemoveBookmarkToProfile,
		private updateProfileDataInputToProfile: UpdateProfileDataInputToProfile,
		private findClientByUserId: FindClientByUserId,
		private addLikeToClient: AddLike,
		private removeLikeToClient: RemoveLike,
		private addBookmarkToClient: AddBookmark,
		private removeBookmarkToClient: RemoveBookmark,
		private findPrefByCode: FindByPrefCode,
		private findCityByCode: FindByAdmAreaCode,
		private createSearchRecord: CreateSearchRecord
	) {}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => Profile)
	async createProfile(
		@Args("uid", { nullable: true }) uid: string,
		@Args("typeProfile", { defaultValue: TypeProfile.FREE })
		typeProfile: string,
		@Args("profileData") data: UpdateProfileDataInput
	) {
		const founded = await this.findByUid.execute(uid);

		if (founded) throw new GraphQLError("Profile Uid Already exist!");

		const profile = await this.updateProfileDataInputToProfile.execute(
			data
		);

		profile.uid = uid || (await this.generateUid.execute());
		profile.linkName = profile.uid;
		profile.typeProfile = TypeProfile[typeProfile.toUpperCase()];

		const pref = await this.findPrefByCode.execute(data.prefCode);
		profile.address.prefName = pref?.name || "";
		const city = await this.findCityByCode.execute(data.cityCode);
		profile.address.cityName = city?.name || "";
		return this.create.execute(profile);
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => String)
	async deleteProfile(@Args("uid") uid: string) {
		const res = await this.remove.execute(uid);
		return `uid:{${uid}}, profile deleted - quantity of deleted: ${res.affected}`;
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => Profile)
	async changeTypeProfile(
		@Args("uid", { nullable: true }) uid: string,
		@Args("typeProfile", { defaultValue: TypeProfile.FREE })
		typeProfile: string
	) {
		const founded = await this.findByUid.execute(uid);

		if (!founded) throw new GraphQLError("Profile does not exist!");

		return this.update.execute(founded, {
			typeProfile: TypeProfile[typeProfile.toUpperCase()],
		} as Profile);
	}

	@UseGuards(AdminRoleGuard)
	@Mutation(() => Profile)
	async updateProfileFromAdmin(
		@Args("uid") uid: string,
		@Args("profileData") data: UpdateProfileDataInput
	) {
		const founded = await this.findByUid.execute(uid);

		if (!founded) throw new GraphQLError("Profile does not exist!");

		const profile = await this.updateProfileDataInputToProfile.execute(
			data
		);
		profile.uid = uid;
		const pref = await this.findPrefByCode.execute(data.prefCode);
		profile.address.prefName = pref?.name || "";
		const city = await this.findCityByCode.execute(data.cityCode);
		profile.address.cityName = city?.name || "";
		if (data.typeProfile)
			profile.typeProfile = TypeProfile[data.typeProfile.toUpperCase()];
		return this.update.execute(founded, profile);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Profile)
	async saveProfileFromUser(
		@CurrentUser() user: UserRecord,
		@Args("profileData") data: UpdateProfileDataInput
	) {
		const profile = await this.updateProfileDataInputToProfile.execute(
			data
		);
		profile.uid = user.uid;
		profile.linkName = user.uid;
		const pref = await this.findPrefByCode.execute(data.prefCode);
		profile.address.prefName = pref?.name || "";
		const city = await this.findCityByCode.execute(data.cityCode);
		profile.address.cityName = city?.name || "";

		const oldProfile = await this.findByUid.execute(user.uid);
		if (!oldProfile) {
			return this.create.execute(profile);
		} else {
			return this.update.execute(oldProfile, profile);
		}
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	async addLike(
		@CurrentUser() account: Account,
		@Args("uid", { type: () => String }) uid: string
	) {
		const userId = account.userId;
		const founded = await this.findByUid.execute(uid);
		if (founded.profileInfo.likes.users.includes(String(userId)))
			return "ok";
		await this.addLikeToProfile.execute(founded, String(userId));

		const client = await this.findClientByUserId.execute(userId);
		if (client.likes.some((p) => p.uid === uid)) return "ok";

		const profileResume = new ProfileResume();
		profileResume.uid = founded.uid;
		profileResume.imageUrl = founded.imageUrl;
		profileResume.displayName = founded.displayName;

		await this.addLikeToClient.execute(client, profileResume);

		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	async removeLike(
		@CurrentUser() account: Account,
		@Args("uid", { type: () => String }) uid: string
	) {
		const userId = account.userId;
		const founded = await this.findByUid.execute(uid);
		if (!founded.profileInfo.likes.users.includes(String(userId)))
			return "ok";
		await this.removeLikeToProfile.execute(founded, String(userId));

		const client = await this.findClientByUserId.execute(userId);
		if (!client.likes.some((p) => p.uid === uid)) return "ok";
		await this.removeLikeToClient.execute(client, uid);

		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	async addBookmark(
		@CurrentUser() account: Account,
		@Args("uid", { type: () => String }) uid: string
	) {
		const userId = account.userId;
		const founded = await this.findByUid.execute(uid);
		if (founded.profileInfo.bookmarks.users.includes(String(userId)))
			return "ok";
		await this.addBookmarkToProfile.execute(founded, String(userId));

		const client = await this.findClientByUserId.execute(userId);
		if (client.bookmarks.some((p) => p.uid === uid)) return "ok";
		const profileResume = new ProfileResume();
		profileResume.uid = founded.uid;
		profileResume.imageUrl = founded.imageUrl;
		profileResume.displayName = founded.displayName;
		await this.addBookmarkToClient.execute(client, profileResume);

		return "ok";
	}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => String)
	async removeBookmark(
		@CurrentUser() account: Account,
		@Args("uid", { type: () => String }) uid: string
	) {
		const userId = account.userId;
		const founded = await this.findByUid.execute(uid);
		if (!founded.profileInfo.bookmarks.users.includes(String(userId)))
			return "ok";
		await this.removeBookmarkToProfile.execute(founded, String(userId));

		const client = await this.findClientByUserId.execute(userId);
		if (!client.bookmarks.some((p) => p.uid === uid)) return "ok";
		await this.removeBookmarkToClient.execute(client, uid);

		return "ok";
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => Profile, { nullable: true })
	async myProfile(@CurrentUser() user: UserRecord) {
		return await this.findByUid.execute(user.uid);
	}

	@Query(() => Profile, { nullable: true })
	async profile(@Args("uid", { type: () => ID }) uid: string) {
		const founded = await this.findActivedByUid.execute(uid);
		await this.addView.execute(founded);
		return founded;
	}

	@Query(() => [Profile])
	randomProfiles(
		@Args("params", { nullable: true })
		params: ParamsRandomProfileFilterInput,
		@Args("limit", { type: () => Number, nullable: true, defaultValue: 10 })
		limit?: number
	) {
		return this.findRandom.execute(limit, {
			typeProfiles: params?.typeProfiles?.map(
				(t) => TypeProfile[t?.toUpperCase()]
			),
			attendances: params?.attendances?.map(
				(a) => Attendance[a?.toUpperCase()]
			),
			category: params?.category,
			subCategory: params?.subCategory,
			prefCode: params?.prefCode,
			cityCode: params?.cityCode,
		});
	}

	@Query(() => PaginatedProfiles)
	async searchProfiles(
		@Args("params", { nullable: true }) params: ParamsProfileFilterInput,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number,
		@Args("ip", { type: () => String, nullable: true })
		ip?: string,
		@Args("isAdmin", {
			type: () => Boolean,
			nullable: true,
			defaultValue: false,
		})
		isAdmin?: boolean
	) {
		if (!isAdmin) {
			const searchRecord = new SearchRecord();
			searchRecord.ip = ip;
			searchRecord.params = JSON.stringify(params);
			await this.createSearchRecord.execute(searchRecord);
		}

		return this.findByParams.execute(
			{
				uid: params.uid,
				typeProfiles: params?.typeProfiles?.map(
					(t) => TypeProfile[t?.toUpperCase()]
				),
				displayName: params?.displayName,
				attendances: params?.attendances?.map(
					(a) => Attendance[a?.toUpperCase()]
				),
				category: params?.category,
				subCategory: params?.subCategory,
				services: params?.services,
				prefCode: params?.prefCode,
				cityCode: params?.cityCode,
				query: params?.query,
			},
			take,
			skip
		);
	}

	// @Mutation(() => String)
	// async updateAll() {
	// 	const profiles = await this.findByParams.execute({}, 100, 0);

	// 	const list = profiles.list.map(async (p) => {
	// 		const newProfile = p;
	// 		const pref = await this.findPrefByCode.execute(p.address.prefCode);
	// 		newProfile.address.prefName = pref?.name || "";
	// 		const city = await this.findCityByCode.execute(p.address.cityCode);
	// 		newProfile.address.cityName = city?.name || "";
	// 		return this.update.execute(p, newProfile);
	// 	});
	// 	const result = await Promise.all(list);
	// 	return "ok";
	// }
}
