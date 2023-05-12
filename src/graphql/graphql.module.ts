import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ServerModule } from "src/modules/services/server.module";
import { UpdateProfileDataInputToProfile } from "./dto/converters/profile/UpdateProfileDataInputToProfile.converter";
import { AnnouncementResolver } from "./resolvers/announcement.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { CityResolver } from "./resolvers/city.resolver";
import { ClientResolver } from "./resolvers/client.resolver";
import { PostResolver } from "./resolvers/post.resolver";
import { PrefectureResolver } from "./resolvers/prefecture.resolver";
import { ProfileResolver } from "./resolvers/profile.resolver";
import { TestimonialResolver } from "./resolvers/testimonial.resolver";

@Module({
	imports: [ServerModule, AuthModule],
	providers: [
		ProfileResolver,
		CategoryResolver,
		ClientResolver,
		TestimonialResolver,
		AnnouncementResolver,
		UpdateProfileDataInputToProfile,
		PrefectureResolver,
		CityResolver,
		PostResolver,
	],
	exports: [],
})
export class GraphqlModule {}
