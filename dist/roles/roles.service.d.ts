import { CreateRoleDto } from './dto/role.dto';
import { PrismaService } from 'src/prisma.serviсe';
import { RabbitMQService } from 'src/rabbitmq.service';
export declare class RolesService {
    private prisma;
    private rabbitMQService;
    constructor(prisma: PrismaService, rabbitMQService: RabbitMQService);
    createRole(dto: CreateRoleDto): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
    getRoleByValue(value: string): Promise<{
        id: number;
        value: string;
        description: string;
    }>;
}
