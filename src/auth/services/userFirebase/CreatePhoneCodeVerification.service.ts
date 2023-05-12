import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { google } from "googleapis";
import { PhoneNumberCodeVerification } from "src/modules/models/PhoneNumberCodeVerification.entity";
import { MongoRepository } from "typeorm";
import { FindPhoneNumber } from "../phoneNumber/FindPhoneNumber.service";

@Injectable()
export class CreatePhoneCodeVerification {
	constructor(
		@InjectRepository(PhoneNumberCodeVerification)
		private repo: MongoRepository<PhoneNumberCodeVerification>,
		private findPhone: FindPhoneNumber
	) {}

	async execute(phoneNumber: string, recaptchaToken: string) {
		const founded = await this.findPhone.execute(phoneNumber);

		if (founded) throw new Error("PhoneNumber already exist!");

		const identitytoolkit = google.identitytoolkit({
			auth: process.env.GOOGLE_CLOUD_KEY,
			version: "v3",
		});

		// Do the magic
		const res = await identitytoolkit.relyingparty.sendVerificationCode({
			requestBody: {
				phoneNumber,
				recaptchaToken,
			},
		});
		const { sessionInfo } = res.data;

		const phoneNumberCodeVerification = await this.repo.findBy({
			phoneNumber,
		});
		if (phoneNumberCodeVerification) {
			await this.repo.save({
				...phoneNumberCodeVerification,
				phoneNumber,
				recaptchaToken,
				sessionInfo,
			});
		} else {
			await this.repo.save({
				phoneNumber,
				recaptchaToken,
				sessionInfo,
			});
		}

		return sessionInfo;
	}
}
