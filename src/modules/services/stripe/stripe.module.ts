import { StripeModule } from "@golevelup/nestjs-stripe";
import { Module } from "@nestjs/common";
import { FirebaseModule } from "src/auth/firebase/firebase.module";
import { ProfileModule } from "../profile/profile.module";
import { FindUserUidService } from "./FindUserUid.service";
import { InvoicePaymentFailed } from "./InvoicePaymentFailed.service";
import { InvoicePaymentSucceeded } from "./InvoicePaymentSucceeded.service";

import { PaymentCanceledService } from "./PaymentCanceled.service";

@Module({
	imports: [
		FirebaseModule,
		ProfileModule,
		StripeModule.externallyConfigured(StripeModule, 0),
	],
	providers: [
		FindUserUidService,
		PaymentCanceledService,
		InvoicePaymentSucceeded,
		InvoicePaymentFailed,
	],
	exports: [
		FindUserUidService,
		PaymentCanceledService,
		InvoicePaymentSucceeded,
		InvoicePaymentFailed,
	],
})
export class StripeClientModule {}
