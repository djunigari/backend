import { Module } from "@nestjs/common";
import { AnnouncementModule } from "./announcement/announcement.module";
import { CategoryModule } from "./category/category.module";
import { ClientModule } from "./client/client.module";
import { PostModule } from "./post/post.module";
import { ProfileModule } from "./profile/profile.module";
import { RegionModule } from "./region/region.module";
import { SearchRecordModule } from "./SearchRecord/searchRecord.module";
import { StripeClientModule } from "./stripe/stripe.module";
import { TestimonialModule } from "./testimonial/testimonial.module";

@Module({
	imports: [
		ProfileModule,
		ClientModule,
		CategoryModule,
		StripeClientModule,
		TestimonialModule,
		AnnouncementModule,
		RegionModule,
		PostModule,
		SearchRecordModule,
	],
	exports: [
		ProfileModule,
		ClientModule,
		CategoryModule,
		StripeClientModule,
		TestimonialModule,
		AnnouncementModule,
		RegionModule,
		PostModule,
		SearchRecordModule,
	],
})
export class ServerModule {}
