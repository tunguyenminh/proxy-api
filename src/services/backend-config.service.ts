import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class BackendConfigService {
  private logger = new Logger(BackendConfigService.name);
  constructor(private configService: ConfigService) {}

  getEnv(key: string): string {
    const value = this.configService.get<string>(key);
    if (isNil(value)) {
      this.logger.error(`Environment variable ${key} not set!`);
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
    return value;
  }
}
