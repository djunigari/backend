import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { google } from "googleapis";
import { PhoneNumberCodeVerification } from "src/modules/models/PhoneNumberCodeVerification.entity";
import { MongoRepository } from "typeorm";

@Injectable()
export class VerifyPhoneCodeVerification {
	constructor(
		@InjectRepository(PhoneNumberCodeVerification)
		private repo: MongoRepository<PhoneNumberCodeVerification>
	) {}

	async execute(sessionInfo: string, phoneNumber: string, code: string) {
		const founded = this.repo.findBy({ sessionInfo, phoneNumber });

		if (!founded) throw new Error("Phone code not exist!");

		const identitytoolkit = google.identitytoolkit({
			auth: process.env.GOOGLE_CLOUD_KEY,
			version: "v3",
		});

		await identitytoolkit.relyingparty.verifyPhoneNumber({
			requestBody: {
				code,
				sessionInfo,
			},
		});

		await this.repo.delete({ phoneNumber });
		return "ok";
	}
}
