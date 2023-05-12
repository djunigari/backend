import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserPhoneNumberHistory } from "src/modules/models/auth/UserPhoneNumberHistory.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class CreateUserPhoneNumberHistory {
	constructor(
		@InjectRepository(UserPhoneNumberHistory)
		private repo: MongoRepository<UserPhoneNumberHistory>
	) {}

	async execute(newPhoneNumber: UserPhoneNumberHistory) {
		return this.repo.save(newPhoneNumber);
	}
}
