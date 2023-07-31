import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import configuration from '../common/configuration';
import { UploadModule } from './upload/upload.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'public'),
      serveStaticOptions: {
        index: false,
        cacheControl: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    WebsocketModule,
  ],
})
export class CoreModule {}
