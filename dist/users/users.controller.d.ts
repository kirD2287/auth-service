import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '@prisma/client';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<Users>;
    getAll(): Promise<({
        roles: ({
            role: {
                id: number;
                value: string;
                description: string;
            };
        } & {
            userId: number;
            roleId: number;
        })[];
    } & {
        id: number;
        email: string;
        password: string;
    })[]>;
    getUserByEmail(email: string): Promise<{
        roles: ({
            role: {
                id: number;
                value: string;
                description: string;
            };
        } & {
            userId: number;
            roleId: number;
        })[];
    } & {
        id: number;
        email: string;
        password: string;
    }>;
    updateUser(id: number, updatedUser: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
}
