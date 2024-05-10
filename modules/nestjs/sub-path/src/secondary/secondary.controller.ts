import { Controller, Get } from '@nestjs/common';
import { SecondaryService } from './secondary.service';

@Controller('secondary')
export class SecondaryController {
  constructor(private readonly secondaryService: SecondaryService) { }

  @Get('hello')
  getHello(): string {
    return this.secondaryService.getHello();
  }
}
