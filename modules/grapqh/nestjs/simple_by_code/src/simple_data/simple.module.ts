import { Module } from "@nestjs/common";
import { SimpleResolver } from "./simple.resolver";
import { SimpleService } from "./simple.service";

@Module({
  providers: [SimpleResolver, SimpleService],
})
export class SimpleModule {
  
}
