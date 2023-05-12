import { Injectable } from "@nestjs/common";
import { FirebaseService } from "src/auth/firebase/firebase.service";

@Injectable()
export class FindByPhoneNumber {
	constructor(private readonly firebase: FirebaseService) {}

	async execute(phoneNumber: string) {
		const auth = this.firebase.getAuth();

		try {
			return await auth.getUserByPhoneNumber(phoneNumber);
		} catch (error) {
			return null;
		}
	}
}
