import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hey there!\n The server is working';
    return 'https://github.com/seven-bit/MetaMusic';
  }
}
