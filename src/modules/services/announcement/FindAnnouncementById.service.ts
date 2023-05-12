import { Injectable } from "@nestjs/common";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

@Injectable()
export class FindAnnouncementById extends BaseAnnouncement {
	async execute(id: string) {
		return this.repo().findOneBy({ id });
	}
}
