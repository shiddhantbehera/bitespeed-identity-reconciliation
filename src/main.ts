import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const servicePort = configService.get<number>('port') ?? 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('BiteSpeed Identity Reconciliation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
    })
    .build();
  const documentation = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentation, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
  await app.listen(servicePort);
}
bootstrap()
  .then(() => {})
  .catch(() => {});
