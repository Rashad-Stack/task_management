import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
