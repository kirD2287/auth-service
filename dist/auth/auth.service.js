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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const rabbitmq_service_1 = require("../rabbitmq.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, rabbitMQService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.rabbitMQService = rabbitMQService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        const token = this.generateToken(user);
        await this.rabbitMQService.publish('user.loggedin', {
            id: user.id,
            email: user.email,
        });
        return token;
    }
    async registration(userDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('Пользователь с таким email существует', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.usersService.createUser({
            ...userDto,
            password: hashPassword,
        });
        await this.rabbitMQService.publish('user.registered', {
            id: user.id,
            email: user.email,
        });
        return this.generateToken(user);
    }
    async generateToken(user) {
        const roles = await this.usersService.getUserRoles(user.id);
        const payload = {
            email: user.email,
            id: user.id,
            roles: roles,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(userDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({
            message: 'Некорректный емаил или пароль',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        rabbitmq_service_1.RabbitMQService])
], AuthService);
//# sourceMappingURL=auth.service.js.map