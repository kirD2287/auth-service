"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_servi_e_1 = require("../prisma.servi\u0441e");
const roles_service_1 = require("../roles/roles.service");
const rabbitmq_service_1 = require("../rabbitmq.service");
let UsersService = class UsersService {
    constructor(prisma, rolesService, rabbitMQService) {
        this.prisma = prisma;
        this.rolesService = rolesService;
        this.rabbitMQService = rabbitMQService;
    }
    async createUser(dto) {
        const existingUser = await this.prisma.users.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const user = await this.prisma.users.create({
            data: {
                email: dto.email,
                password: dto.password,
            },
        });
        const role = await this.rolesService.getRoleByValue('ADMIN');
        await this.prisma.UsersRoles.create({
            data: {
                userId: user.id,
                roleId: role.id,
            },
        });
        await this.rabbitMQService.publish('user.created', {
            userId: user.id,
            email: user.email,
            role: role.value,
        });
        return user;
    }
    async getAllUsers() {
        const users = await this.prisma.users.findMany({
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        return users;
    }
    async getUserByEmail(email) {
        const user = await this.prisma.users.findFirst({
            where: { email },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async updateUser(id, updatedUser) {
        const user = await this.prisma.users.update({
            where: { id },
            data: updatedUser,
        });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        await this.rabbitMQService.publish('user.updated', {
            userId: user.id,
            email: user.email,
        });
        return user;
    }
    async deleteUser(id) {
        const user = await this.prisma.users.delete({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        await this.rabbitMQService.publish('user.deleted', {
            userId: user.id,
            email: user.email,
        });
        return user;
    }
    async getUserRoles(userId) {
        const userWithRoles = await this.prisma.users.findFirst({
            where: { id: userId },
            include: {
                roles: {
                    select: {
                        role: {
                            select: {
                                id: true,
                                value: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
        if (!userWithRoles) {
            throw new common_1.HttpException('Пользователь не найден', common_1.HttpStatus.NOT_FOUND);
        }
        return userWithRoles.roles.map((userRole) => ({
            id: userRole.role.id,
            value: userRole.role.value,
            description: userRole.role.description,
        }));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_servi_e_1.PrismaService,
        roles_service_1.RolesService,
        rabbitmq_service_1.RabbitMQService])
], UsersService);
//# sourceMappingURL=users.service.js.map