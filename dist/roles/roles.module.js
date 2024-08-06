"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const roles_controller_1 = require("./roles.controller");
const client_1 = require("@prisma/client");
const prisma_servi_e_1 = require("../prisma.servi\u0441e");
const users_module_1 = require("../users/users.module");
const auth_service_1 = require("../auth/auth.service");
const auth_module_1 = require("../auth/auth.module");
const rabbitmq_module_1 = require("../rabbitmq.module");
const rabbitmq_service_1 = require("../rabbitmq.service");
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = __decorate([
    (0, common_1.Module)({
        providers: [roles_service_1.RolesService, client_1.PrismaClient, prisma_servi_e_1.PrismaService, auth_service_1.AuthService, rabbitmq_service_1.RabbitMQService],
        controllers: [roles_controller_1.RolesController],
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule, rabbitmq_module_1.RabbitMQModule],
        exports: [],
    })
], RolesModule);
//# sourceMappingURL=roles.module.js.map