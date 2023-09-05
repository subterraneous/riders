import { NestFactory } from "@nestjs/core"

import { Module, Controller, Get, Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!"
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

async function createApp() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000)
}

createApp()
