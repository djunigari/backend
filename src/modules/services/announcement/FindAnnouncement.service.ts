import { Injectable } from "@nestjs/common";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

@Injectable()
export class FindAnnouncement extends BaseAnnouncement {
	async execute(uid: string, id: string) {
		return this.repo().findOneBy({ uid, id });
	}
}
