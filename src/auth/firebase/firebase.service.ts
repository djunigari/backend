import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
    constructor(private readonly config: ConfigService) {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: this.config.get('firebase.projectId'),
                    clientEmail: this.config.get('firebase.clientEmail'),
                    privateKey: this.config.get('firebase.privateKey'),
                }),
                databaseURL: this.config.get('firebase.databaseURL'),
            });
        }
    }

    getAuth = () => admin.auth();

    getFirestore = () => admin.firestore();
}
