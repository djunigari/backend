import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfig } from "src/modules/models/AppConfig.entity";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { ProfileAddress } from "src/modules/models/Profile/ProfileAddress.entity";
import { ProfileInfo } from "src/modules/models/Profile/profileInfo.entity";
import { SearchRecord } from "src/modules/models/SearchRecord.entity";
import { AddBookmarkToProfile } from "./AddBookmarkToProfile.service";
import { AddLikeToProfile } from "./AddLikeToProfile.service";
import { AddViewToProfile } from "./AddViewToProfile.service";
import { BaseProfile } from "./BaseProfile.service";
import { CreateProfile } from "./CreateProfile.service";
import { DeleteProfileByUid } from "./DeleteProfile.service";
import { DisableProfile } from "./DisableProfile.service";
import { FindActivedProfileByUid } from "./FindActivedProfileByUid.service";
import { FindProfileByUid } from "./FindProfileByUid.service";
import { FindProfilesByParams } from "./FindProfilesByParams.service";
import { FindRandomProfiles } from "./FindRandomProfiles.service";
import { GenerateUid } from "./GenerateUid.service";
import { RemoveBookmarkToProfile } from "./RemoveBookmarkToProfile.service";
import { RemoveLikeToProfile } from "./RemoveLikeToProfile.service";
import { UpdateProfile } from "./UpdateProfile.service";
import { UpdateSearchableFields } from "./UpdateSearchableFields.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			AppConfig,
			Profile,
			ProfileInfo,
			ProfileAddress,
			SearchRecord,
		]),
	],
	providers: [
		UpdateSearchableFields,
		BaseProfile,
		FindProfileByUid,
		FindActivedProfileByUid,
		FindProfilesByParams,
		GenerateUid,
		CreateProfile,
		UpdateProfile,
		DisableProfile,
		DeleteProfileByUid,
		FindRandomProfiles,
		AddViewToProfile,
		AddLikeToProfile,
		RemoveLikeToProfile,
		AddBookmarkToProfile,
		RemoveBookmarkToProfile,
	],
	exports: [
		UpdateSearchableFields,
		FindProfileByUid,
		FindActivedProfileByUid,
		FindProfilesByParams,
		GenerateUid,
		CreateProfile,
		UpdateProfile,
		DisableProfile,
		DeleteProfileByUid,
		FindRandomProfiles,
		AddViewToProfile,
		AddLikeToProfile,
		RemoveLikeToProfile,
		AddBookmarkToProfile,
		RemoveBookmarkToProfile,
	],
})
export class ProfileModule {}
