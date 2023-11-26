import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as config from "config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const serverConfig = config.get("server");
  console.log(serverConfig);

  const logger = new Logger("bootstrap");
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log("Application listening on port " + port);
}
bootstrap();
