import { StripeWebhookHandler } from "@golevelup/nestjs-stripe";
import { Injectable } from "@nestjs/common";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import Stripe from "stripe";
import { FindProfileByUid } from "../profile/FindProfileByUid.service";
import { UpdateProfile } from "../profile/UpdateProfile.service";
import { FindUserUidService } from "./FindUserUid.service";

@Injectable()
export class PaymentCanceledService {
	constructor(
		private readonly findByUid: FindProfileByUid,
		private readonly findUserUid: FindUserUidService,
		private readonly update: UpdateProfile
	) {}

	@StripeWebhookHandler("customer.subscription.deleted")
	async PaymentCanceledService(evt: Stripe.Event) {
		console.group("\x1b[31mStarting customer.subscription.deleted");
		const obj = evt.data.object as any;
		const customerId = obj.customer;
		console.log(`Subscription Canceled customer: ${customerId}`);
		const uid = await this.findUserUid.execute(customerId);
		if (!uid) {
			console.log(`User uid not founded from customer: ${customerId}`);
			return;
		}
		console.log(`Chaging profile type from uid: ${uid}`);
		const founded = await this.findByUid.execute(uid);
		await this.update.execute(founded, {
			typeProfile: TypeProfile.FREE,
		} as Profile);
		console.log(`Chaged Profile Type to Free: ${founded.uid}`);
		console.groupEnd();
	}
}
