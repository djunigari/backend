import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Announcement } from "src/modules/models/Announcement/Announcement.entity";
import { Category } from "src/modules/models/category.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class BaseAnnouncement {
	constructor(
		@InjectRepository(Announcement)
		private repository: MongoRepository<Announcement>
	) {}
	repo() {
		return this.repository;
	}
}
