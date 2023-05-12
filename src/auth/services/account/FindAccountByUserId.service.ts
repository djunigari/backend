import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/modules/models/auth/Account.entity";
import { User } from "src/modules/models/auth/User.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class FindAccountByUserId {
	constructor(
		@InjectRepository(Account)
		private repo: MongoRepository<Account>
	) {}

	execute(userId: string) {
		return this.repo.findOneBy({ providerAccountId: userId });
	}
}
