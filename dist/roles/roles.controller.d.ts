import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/role.dto';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    createRole(createRoleDto: CreateRoleDto): Promise<{
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
