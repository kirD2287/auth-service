import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { RabbitMQService } from 'src/rabbitmq.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private rabbitMQService;
    constructor(usersService: UsersService, jwtService: JwtService, rabbitMQService: RabbitMQService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
