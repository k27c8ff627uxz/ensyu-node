import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecondaryModule } from './secondary/secondary.module';

@Module({
  imports: [SecondaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
