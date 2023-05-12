import {
	InjectStripeClient,
	StripeWebhookHandler,
} from "@golevelup/nestjs-stripe";
import { Injectable } from "@nestjs/common";
import { TypeProfile } from "src/modules/models/enums/typeProfile.enum";
import { Profile } from "src/modules/models/Profile/profile.entity";
import { Stripe } from "stripe";
import { FindProfileByUid } from "../profile/FindProfileByUid.service";
import { UpdateProfile } from "../profile/UpdateProfile.service";
import { FindUserUidService } from "./FindUserUid.service";

@Injectable()
export class InvoicePaymentFailed {
	constructor(
		@InjectStripeClient() private readonly stripe: Stripe,
		private readonly findByUid: FindProfileByUid,
		private readonly findUserUid: FindUserUidService,
		private readonly update: UpdateProfile
	) {}

	@StripeWebhookHandler("invoice.payment_failed")
	async InvoicePaidService(evt: Stripe.Event) {
		console.group("\x1b[31mStarting invoice.payment_failed");
		const obj = evt.data.object as any;
		const customerId = obj.customer;

		console.log(`Subscription Payment failed of customer: ${customerId}`);
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
