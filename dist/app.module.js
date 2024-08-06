"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users/users.controller");
const roles_controller_1 = require("./roles/roles.controller");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const users_service_1 = require("./users/users.service");
const roles_service_1 = require("./roles/roles.service");
const auth_service_1 = require("./auth/auth.service");
const prisma_servi_e_1 = require("./prisma.servi\u0441e");
const rabbitmq_service_1 = require("./rabbitmq.service");
const rabbitmq_module_1 = require("./rabbitmq.module");
const microservices_1 = require("@nestjs/microservices");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, roles_module_1.RolesModule, auth_module_1.AuthModule, rabbitmq_module_1.RabbitMQModule,
            microservices_1.ClientsModule.register([{
                    name: 'PROJECT_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@rabbitmq:5672'],
                        queue: 'project_queue'
                    }
                }])
        ],
        controllers: [users_controller_1.UsersController, roles_controller_1.RolesController],
        providers: [users_service_1.UsersService, roles_service_1.RolesService, auth_service_1.AuthService, prisma_servi_e_1.PrismaService, rabbitmq_service_1.RabbitMQService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map