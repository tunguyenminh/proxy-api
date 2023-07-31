import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './common/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const whitelist = configuration().whitelistOrigins;

  app.enableCors({
    origin: function (origin, callback) {
      if (
        !whitelist ||
        whitelist.length == 0 ||
        whitelist.indexOf(origin) !== -1
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });
  const config = new DocumentBuilder()
    .setTitle('Proxy API')
    .setDescription('Proxy API documents.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync(
  //   path.resolve(__dirname, '../docs.json'),
  //   JSON.stringify(document),
  // );
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configuration().port);
}

bootstrap();
