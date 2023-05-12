import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/auth/firebase/firebase.service';

@Injectable()
export class FindUserUidService {
    constructor(private readonly firebase: FirebaseService) {}

    async execute(customerId: string) {
        const db = this.firebase.getFirestore();
        const snapshot = await db
            .collection('customers')
            .where('stripeId', '==', customerId)
            .limit(1)
            .get();
        if (snapshot.docs.length > 0) {
            return snapshot.docs[0]?.id;
        }
        return;
    }
}
