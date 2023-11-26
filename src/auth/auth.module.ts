import { Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "./user.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: "wuFOHws0vve4/ME6YfeUfBc/NrXoE8iFbZOckpxizhw=",
      signOptions: { expiresIn: 3600 },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
