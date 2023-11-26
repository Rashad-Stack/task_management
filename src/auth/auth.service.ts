import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(authDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authDto;

    try {
      const user = new User();
      user.username = username;
      user.password = await this.hashPassword(password);

      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async signing(authDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authDto;

    const user = await this.userRepository.findOneBy({ username });

    if (user && (await user.validatePassword(password))) return user.username;
    else throw new UnauthorizedException("Invalid credentials");
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
