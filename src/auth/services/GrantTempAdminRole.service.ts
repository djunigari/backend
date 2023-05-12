import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class GrantTempAdminRole {
    constructor(private readonly firebase: FirebaseService) {}

    async execute(email: string) {
        const auth = this.firebase.getAuth();
        const user = await auth.getUserByEmail(email);

        if (!user) throw new NotFoundException('User do not exist!');

        await auth.updateUser(user.uid, { emailVerified: true });
        await auth.setCustomUserClaims(user.uid, { roles: ['admin'] });
    }
}
