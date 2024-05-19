import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTop(): string {
    return 'Run `http://localhost:3000/graphql`';
  }
}
