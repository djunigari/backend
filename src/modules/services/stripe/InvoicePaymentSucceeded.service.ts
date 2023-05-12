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
export class InvoicePaymentSucceeded {
	constructor(
		@InjectStripeClient() private readonly stripe: Stripe,
		private readonly findByUid: FindProfileByUid,
		private readonly findUserUid: FindUserUidService,
		private readonly update: UpdateProfile
	) {}

	@StripeWebhookHandler("invoice.payment_succeeded")
	async paymentSucceeded(evt: Stripe.Event) {
		console.group("\x1b[32m Starting invoice.payment_succeeded");
		const obj = evt.data.object as any;
		const subscriptionId = obj.subscription;
		const customerId = obj.customer;

		console.log(
			`Subscription Payment succeeded of customer: ${customerId}`
		);

		try {
			console.log(`search subscriptionId: ${subscriptionId}`);
			const subscription = await this.stripe.subscriptions.retrieve(
				subscriptionId
			);

			const productId = subscription.items.data[0].plan.product;
			console.log(`search productId: ${productId}`);
			const product = await this.stripe.products.retrieve(
				productId as string
			);
			const firebaseRole = product?.metadata?.firebaseRole;

			const uid = await this.findUserUid.execute(customerId);
			if (!uid) {
				console.log(
					`User uid not founded from customer: ${customerId}`
				);
				return;
			}

			console.log(`Chaging profile type from uid: ${uid}`);
			const founded = await this.findByUid.execute(uid);
			await this.update.execute(founded, {
				typeProfile: TypeProfile[firebaseRole.toUpperCase()],
			} as Profile);
			console.log(
				`Chaged Profile Type to ${firebaseRole}: ${founded.uid}`
			);
			console.groupEnd();
		} catch (error) {
			console.error("error: ", error.message);
		} finally {
			console.groupEnd();
		}
	}
}
