import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<span><h1>Visit <a href = "https://github.com/seven-bit/MetaMusic#readme">README</a> for more details</h1> </span>';
  }
}
