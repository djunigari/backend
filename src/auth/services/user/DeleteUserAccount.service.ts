import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/models/auth/User.entity";
import { MongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { Account } from "src/modules/models/auth/Account.entity";

@Injectable()
export class DeleteUserAccount {
	constructor(
		@InjectRepository(User)
		private repo: MongoRepository<User>,
		@InjectRepository(Account)
		private repoAccount: MongoRepository<Account>
	) {}

	async execute(userId: ObjectID) {
		console.group("deleting");
		console.log(userId);
		const accounts = await this.repoAccount.findBy({ userId });
		console.log(accounts);

		const deleteAccounts = accounts.map(
			async (a) => await this.repoAccount.softDelete(a)
		);

		const res = await Promise.all(deleteAccounts);
		console.log(res.map((r) => console.log(r.raw)));

		const res2 = await this.repo.softDelete(userId);
		console.log(res2);

		console.groupEnd();
	}
}
