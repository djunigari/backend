import { Injectable } from '@nestjs/common';
import { BaseProfile } from './BaseProfile.service';

@Injectable()
export class DeleteProfileByUid extends BaseProfile {
    execute(uid: string) {
        return this.repo().delete({ uid });
    }
}
