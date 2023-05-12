import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneNumber } from "src/modules/models/auth/PhoneNumber.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class DeletePhoneNumberByUid {
	constructor(
		@InjectRepository(PhoneNumber)
		private repo: MongoRepository<PhoneNumber>
	) {}

	async execute(uid: string) {
		return this.repo.deleteOne({ uid });
	}
}
