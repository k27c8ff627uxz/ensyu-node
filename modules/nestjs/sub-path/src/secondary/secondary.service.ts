import { Injectable } from '@nestjs/common';

@Injectable()
export class SecondaryService {
  getHello(): string {
    return 'Secondary Hello World!';
  }
}
