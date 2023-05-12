import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { MongoRepository } from "typeorm";

import { UpdateSearchableFields } from "./UpdateSearchableFields.service";

@Injectable()
export class BaseProfile {
	constructor(
		@InjectRepository(Profile)
		private repository: MongoRepository<Profile>,
		private searchableFields: UpdateSearchableFields
	) {}
	repo() {
		return this.repository;
	}

	updateSearchableField(profile: Profile) {
		return this.searchableFields.execute(profile);
	}
}
