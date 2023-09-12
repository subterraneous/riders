import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "bike4us/project/module"

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("/api/v1")

  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document)

  await app.listen(3000)
}
