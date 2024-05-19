import { Query, Resolver } from "@nestjs/graphql";
import { SimpleService } from "./simple.service";
import { SimpleData } from "./models/simple.model";

@Resolver()
export class SimpleResolver {
  constructor(private readonly simpleService: SimpleService) { }
  
  @Query(() => [SimpleData]!)
  getData(): SimpleData[] {
    return this.simpleService.getData();
  }
}
