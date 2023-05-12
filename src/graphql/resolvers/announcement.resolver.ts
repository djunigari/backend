import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserRecord } from "firebase-admin/auth";
import { resolve } from "path/posix";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { DeleteAnnouncement } from "src/modules/services/announcement/DeleteAnnouncement.service";
import { FindAllAnnouncement } from "src/modules/services/announcement/FindAllAnnouncement.service";
import { FindAnnouncement } from "src/modules/services/announcement/FindAnnouncement.service";
import { FindAnnouncementById } from "src/modules/services/announcement/FindAnnouncementById.service";
import { FindRandomAnnouncement } from "src/modules/services/announcement/FindRandom.service";
import { SaveAnnouncement } from "src/modules/services/announcement/SaveAnnouncement.service";
import { ParamsRandomAnnouncementsFilterInput } from "../dto/announcement/random-announcements.input";
import { PaginatedAnnouncements } from "../response/PaginatedAnnouncement";

@Resolver(() => Announcement)
export class AnnouncementResolver {
	constructor(
		private save: SaveAnnouncement,
		private remove: DeleteAnnouncement,
		private find: FindAnnouncement,
		private findById: FindAnnouncementById,
		private findAll: FindAllAnnouncement,
		private findRandom: FindRandomAnnouncement
	) {}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Announcement)
	async createAnnouncement(
		@CurrentUser() user: UserRecord,
		@Args("imageUrl", { type: () => String }) imageUrl: string,
		@Args("url", { type: () => String, nullable: true })
		url: string,
		@Args("name", { type: () => String })
		name: string
	) {
		const announcement = new Announcement();
		announcement.uid = user.uid;
		announcement.imageUrl = imageUrl;
		announcement.name = name;
		announcement.url = url;
		return this.save.execute(announcement);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Announcement)
	async updateAnnouncement(
		@CurrentUser() user: UserRecord,
		@Args("id", { type: () => ID }) id: string,
		@Args("url", { type: () => String, nullable: true })
		url: string,
		@Args("name", { type: () => String, nullable: true })
		name: string
	) {
		const announcement = await this.find.execute(user.uid, id);
		if (!announcement) throw new Error("Announcement do not exist!");
		return this.save.execute({ ...announcement, url, name });
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => String)
	async removeAnnouncement(
		@CurrentUser() user: UserRecord,
		@Args("id", { type: () => ID }) id: string
	) {
		const announcement = await this.find.execute(user.uid, id);
		if (!announcement) throw new Error("Announcement do not exist!");
		const res = await this.remove.execute(announcement.id);
		return `id:{${id}}, announcement deleted - quantity of deleted: ${res.affected}`;
	}

	@Query(() => Announcement, { nullable: true })
	async announcement(@Args("id", { type: () => ID }) id: string) {
		return this.findById.execute(id);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => PaginatedAnnouncements)
	async myAnnouncements(
		@CurrentUser() user: UserRecord,
		@Args("take", { type: () => Number, nullable: true, defaultValue: 10 })
		take?: number,
		@Args("skip", { type: () => Number, nullable: true, defaultValue: 0 })
		skip?: number
	) {
		return this.findAll.execute(user.uid, take, skip);
	}

	@Query(() => [Announcement], { nullable: true })
	async randomAnnouncements(
		@Args("params", { nullable: true })
		params: ParamsRandomAnnouncementsFilterInput,
		@Args("limit", { type: () => Number, nullable: true, defaultValue: 3 })
		limit?: number
	) {
		return this.findRandom.execute(limit, {
			prefectureCode: params?.prefectureCode,
			cityCode: params?.cityCode,
			category: params?.category,
			subCategory: params?.subCategory,
		});
	}
}
