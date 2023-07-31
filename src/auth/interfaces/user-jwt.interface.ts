export interface IUserJWT {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly userRole: string;
    readonly userPermissions?: string[];
}
