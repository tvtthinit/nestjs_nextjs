import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('NestJS API with JWT, Users & Roles, PostgreSQL')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3001;
  const clientPort = configService.get<number>('CLIENT_PORT') || 3000;

  app.enableCors({
    origin: "http://localhost:"+clientPort,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();