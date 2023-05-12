import { Injectable } from "@nestjs/common";
import { PhoneNumber } from "src/modules/models/auth/PhoneNumber.entity";
import { UserPhoneNumberHistory } from "src/modules/models/auth/UserPhoneNumberHistory.entity";
import { FirebaseService } from "../firebase/firebase.service";
import { CreatePhoneNumber } from "./phoneNumber/CreatePhoneNumber.service";
import { CreateUserPhoneNumberHistory } from "./phoneNumber/CreateUserPhoneNumberHistory.service";

@Injectable()
export class SetFirebaseUserPhoneNumber {
	constructor(
		private readonly firebase: FirebaseService,
		private readonly createPhoneNumber: CreatePhoneNumber,
		private readonly createPhoneNumberHistory: CreateUserPhoneNumberHistory
	) {}

	async execute(uid: string, phoneNumber: string) {
		const auth = this.firebase.getAuth();
		console.group("SetFirebaseUserPhoneNumber");
		const temp = await auth.getUserByPhoneNumber(phoneNumber);
		console.log(`userPhoneNumber: ${temp.uid}`);
		if (temp) {
			if (temp.email) {
				console.log(`PhoneNumber already used from user: ${temp.uid}`);
				console.groupEnd();
				throw new Error("PhoneNumber already exist");
			}

			console.log(
				`user: ${temp.uid} do not have email, so it is temporary user`
			);
			console.log(`deleting temp user: ${temp.uid}`);
			await auth.deleteUser(temp.uid);

			const history = new UserPhoneNumberHistory();
			history.uid = uid;
			history.fromPhoneNumber = "";
			history.toPhoneNumber = phoneNumber;
			await this.createPhoneNumberHistory.execute(history);

			const phone = new PhoneNumber();
			phone.uid = uid;
			phone.phoneNumber = phoneNumber;
			await this.createPhoneNumber.execute(phone);

			console.log(
				`adding new phoneNumber: ${phoneNumber} to user: ${uid}`
			);
			await auth.updateUser(uid, { phoneNumber });
		}

		console.groupEnd();
		return;
	}
}
