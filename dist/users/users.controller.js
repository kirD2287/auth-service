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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("./user.model");
const roles_auth_decorator_1 = require("../auth/roles-auth-decorator");
const roles_guard_1 = require("../auth/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(dto) {
        return this.usersService.createUser(dto);
    }
    getAll() {
        return this.usersService.getAllUsers();
    }
    getUserByEmail(email) {
        return this.usersService.getUserByEmail(email);
    }
    updateUser(id, updatedUser) {
        return this.usersService.updateUser(id, updatedUser);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_model_1.User] }),
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JWTAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение пользователя по email' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление пользователя по id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление пользователя по id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('CRUD Пользователей'),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map