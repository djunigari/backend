import { Injectable } from "@nestjs/common";
import { PhoneNumber } from "src/modules/models/auth/PhoneNumber.entity";
import { UserPhoneNumberHistory } from "src/modules/models/auth/UserPhoneNumberHistory.entity";
import { FirebaseService } from "../firebase/firebase.service";
import { CreatePhoneNumber } from "./phoneNumber/CreatePhoneNumber.service";
import { CreateUserPhoneNumberHistory } from "./phoneNumber/CreateUserPhoneNumberHistory.service";
import { DeletePhoneNumber } from "./phoneNumber/DeletePhoneNumber.service";
import { DeletePhoneNumberByUid } from "./phoneNumber/DeletePhoneNumberByUid.service";
import { FindPhoneNumber } from "./phoneNumber/FindPhoneNumber.service";
import { FindPhoneNumberByUid } from "./phoneNumber/FindPhoneNumberByUid.service";

@Injectable()
export class UpdateFirebaseUserPhoneNumber {
	constructor(
		private readonly firebase: FirebaseService,
		private readonly find: FindPhoneNumber,
		private readonly findByUi: FindPhoneNumberByUid,
		private readonly createPhoneNumber: CreatePhoneNumber,
		private readonly createPhoneNumberHistory: CreateUserPhoneNumberHistory,
		private readonly deletePhoneNumber: DeletePhoneNumber,
		private readonly deletePhoneNumberByUid: DeletePhoneNumberByUid
	) {}

	async execute(uid: string, phoneNumber: string) {
		const auth = this.firebase.getAuth();
		console.group(`UpdateFirebaseUserPhoneNumber from user: ${uid}`);
		const founded = await auth.getUser(uid);
		if (!founded?.email) {
			console.groupEnd();
			throw new Error(`User do not exist!`);
		}

		console.log(`Search for phone number (${phoneNumber})`);
		const oldUser = await this.find.execute(phoneNumber as string);

		if (oldUser) {
			console.log(`PhoneNumber was used by user: ${oldUser.uid}`);
			const history = new UserPhoneNumberHistory();
			history.uid = oldUser.uid;
			history.fromPhoneNumber = oldUser.phoneNumber;
			history.toPhoneNumber = phoneNumber;
			console.log(
				`Chaging phoneNumber from user: ${oldUser.uid} as null`
			);
			await this.createPhoneNumberHistory.execute(history);
			console.log(`Deleting phoneNumber register: ${phoneNumber}`);
			await this.deletePhoneNumber.execute(oldUser);
		}

		const history = new UserPhoneNumberHistory();
		history.uid = uid;
		history.fromPhoneNumber = founded.phoneNumber;
		history.toPhoneNumber = phoneNumber;
		await this.createPhoneNumberHistory.execute(history);

		console.log(`Changing phone number (${phoneNumber}) to user: ${uid}`);
		if (phoneNumber) {
			const phone = new PhoneNumber();
			phone.uid = uid;
			phone.phoneNumber = phoneNumber;
			await this.createPhoneNumber.execute(phone);
			await auth.updateUser(uid, { phoneNumber });
		} else {
			await this.deletePhoneNumberByUid.execute(uid);
			await auth.updateUser(uid, { phoneNumber: null });
		}

		console.groupEnd();
		return;
	}
}
