import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { AnnouncementInfo } from "src/modules/models/Announcement/AnnouncementInfo.entity";
import { BaseAnnouncement } from "./BaseAnnouncement.service";
import { DeleteAnnouncement } from "./DeleteAnnouncement.service";
import { FindAllAnnouncement } from "./FindAllAnnouncement.service";
import { FindAnnouncement } from "./FindAnnouncement.service";
import { FindAnnouncementById } from "./FindAnnouncementById.service";
import { FindRandomAnnouncement } from "./FindRandom.service";
import { SaveAnnouncement } from "./SaveAnnouncement.service";

@Module({
	imports: [TypeOrmModule.forFeature([Announcement, AnnouncementInfo])],
	providers: [
		BaseAnnouncement,
		SaveAnnouncement,
		DeleteAnnouncement,
		FindAnnouncement,
		FindAnnouncementById,
		FindAllAnnouncement,
		FindRandomAnnouncement,
	],
	exports: [
		TypeOrmModule,
		SaveAnnouncement,
		DeleteAnnouncement,
		FindAnnouncement,
		FindAllAnnouncement,
		FindRandomAnnouncement,
		SaveAnnouncement,
		DeleteAnnouncement,
		FindAnnouncementById,
		FindAnnouncement,
		FindAllAnnouncement,
		FindRandomAnnouncement,
	],
})
export class AnnouncementModule {}
