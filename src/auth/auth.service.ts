import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { IJwt } from "./payload-jwt.interface";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async signing(authDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authDto;

    const user = await this.userRepository.findOneBy({ username });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: IJwt = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
