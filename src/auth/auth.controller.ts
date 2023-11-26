import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  async signUp(
    @Body(ValidationPipe) authDto: AuthCredentialsDto,
  ): Promise<void> {
    await this.authService.signUp(authDto);
  }

  @Post("/signing")
  async signing(
    @Body(ValidationPipe) authDto: AuthCredentialsDto,
  ): Promise<string> {
    return await this.authService.signing(authDto);
  }
}
