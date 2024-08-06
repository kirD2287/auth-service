import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.serviсe';
import { RolesService } from 'src/roles/roles.service';
import { RabbitMQService } from 'src/rabbitmq.service';
export declare class UsersService {
    private prisma;
    private rolesService;
    private rabbitMQService;
    constructor(prisma: PrismaService, rolesService: RolesService, rabbitMQService: RabbitMQService);
    createUser(dto: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    getAllUsers(): Promise<({
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
    getUserRoles(userId: number): Promise<{
        id: number;
        value: string;
        description: string;
    }[]>;
}
