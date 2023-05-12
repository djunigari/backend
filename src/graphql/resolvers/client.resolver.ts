import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { ClientAuthGuard } from "src/auth/guards/client-auth.guard";
import { Account } from "src/modules/models/auth/Account.entity";
import { Client } from "src/modules/models/client/Client.entity";
import { CreateClient } from "src/modules/services/client/CreateClient.service";
import { FindClientByUserId } from "src/modules/services/client/FindClientByUserId.service";

@Resolver(() => Client)
export class ClientResolver {
	constructor(
		private findByUserId: FindClientByUserId,
		private create: CreateClient
	) {}

	@UseGuards(ClientAuthGuard)
	@Mutation(() => Client)
	async createClient(@CurrentUser() account: Account) {
		const founded = await this.findByUserId.execute(account.userId);
		if (founded) return founded;
		return this.create.execute(account.userId);
	}

	@UseGuards(ClientAuthGuard)
	@Query(() => Client, { nullable: true })
	client(@CurrentUser() account: Account) {
		return this.findByUserId.execute(account.userId);
	}
}
