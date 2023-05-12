import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { google } from "googleapis";
import { Strategy } from "passport-http-bearer";
import { Account } from "src/modules/models/auth/Account.entity";
import { MongoRepository } from "typeorm";
import { FindAccountByUserId } from "../services/account/FindAccountByUserId.service";

export const StrategyName = "client-auth";

@Injectable()
export class ClientAuthStrategy extends PassportStrategy(
	Strategy,
	"client-auth"
) {
	constructor(private findAccountByUserId: FindAccountByUserId) {
		super();
	}

	async validate(jwtToken: string): Promise<Account> {
		try {
			const res = await google
				.oauth2("v2")
				.tokeninfo({ oauth_token: jwtToken });
			const { user_id } = res.data;

			const account = await this.findAccountByUserId.execute(user_id);
			if (!account) {
				throw new ForbiddenException("Account not found");
			}

			return account;
		} catch (error) {
			console.log(error);
			if (error?.message?.error_description === "Invalid Value") {
				throw new ForbiddenException("Invalid Access Token!");
			}
			throw new ForbiddenException("Internal Error");
		}
	}
}
