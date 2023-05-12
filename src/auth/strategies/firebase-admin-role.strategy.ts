import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRecord } from 'firebase-admin/auth';
import { Strategy } from 'passport-http-bearer';
import { AuthenticationService } from '../services/Authentication.service';

export const AdminRoleStrategyName = 'firebase-admin-role';

@Injectable()
export class FirebaseAdminRoleStrategy extends PassportStrategy(
    Strategy,
    'firebase-admin-role',
) {
    constructor(private readonly authenticationService: AuthenticationService) {
        super();
    }

    async validate(jwtToken: string): Promise<UserRecord> {
        // console.group('validate user token');
        // console.log(jwtToken);
        const user = await this.authenticationService.execute(jwtToken);
        // console.log(user);
        // console.groupEnd();
        if (user.disabled || !hasAdminRole(user)) {
            throw new ForbiddenException();
        }
        return user;
    }
}

const hasAdminRole = (user?: UserRecord) => {
    const roles: string[] = user?.customClaims?.roles || [];
    if (roles.includes('admin')) return true;
    return false;
};
