import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseError } from 'firebase-admin';
// import * as firebaseAdmin from 'firebase-admin';

// type DecodedIdToken = firebaseAdmin.auth.DecodedIdToken;
// export type FirebaseAuthDecodedUser = Readonly<
//   Pick<DecodedIdToken, 'uid' | 'email' | 'email_verified'>
// >;

@Injectable()
export class AuthenticationService {
    constructor(private readonly firebase: FirebaseService) {}

    private readonly checkRevoked = false;
    private readonly logger = new Logger('firebase-auth');

    async execute(jwtToken: string) {
        try {
            const payload = await this.firebase
                .getAuth()
                .verifyIdToken(jwtToken, this.checkRevoked);

            return this.firebase.getAuth().getUser(payload.uid);
        } catch (err: unknown) {
            const e = err as FirebaseError;
            if (e.code === 'auth/id-token-expired') {
                this.logger.warn('auth/id-token-expired');
            } else if (e.code === 'auth/id-token-revoked') {
                this.logger.warn('auth/id-token-revoked');
            }

            throw new UnauthorizedException();
        }
    }
}
