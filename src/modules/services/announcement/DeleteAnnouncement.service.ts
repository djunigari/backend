import { Injectable } from "@nestjs/common";
import { BaseAnnouncement } from "./BaseAnnouncement.service";

@Injectable()
export class DeleteAnnouncement extends BaseAnnouncement {
	execute(id: string) {
		return this.repo().delete({ id });
	}
}
