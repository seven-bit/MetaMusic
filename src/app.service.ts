import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ' visit here for details: https://github.com/seven-bit/MetaMusic';
  }
}
