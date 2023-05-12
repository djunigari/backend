import { Injectable } from "@nestjs/common";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

@Injectable()
export class SaveAnnouncement extends BaseAnnouncement {
	async execute(announcement: Announcement) {
		return this.repo().save(announcement);
	}
}
