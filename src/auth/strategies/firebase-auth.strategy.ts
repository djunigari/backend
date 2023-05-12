import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserRecord } from "firebase-admin/auth";
import { Strategy } from "passport-http-bearer";
import { AuthenticationService } from "../services/Authentication.service";

export const StrategyName = "firebase-auth";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
	Strategy,
	"firebase-auth"
) {
	constructor(private readonly authenticationService: AuthenticationService) {
		super();
	}

	async validate(jwtToken: string): Promise<UserRecord> {
		const user = await this.authenticationService.execute(jwtToken);
		if (!user || user.disabled) {
			throw new ForbiddenException();
		}
		return user;
	}
}
