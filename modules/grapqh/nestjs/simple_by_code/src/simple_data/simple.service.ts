import { Injectable } from "@nestjs/common";
import { SimpleData } from "./models/simple.model";

@Injectable()
export class SimpleService {
  data: SimpleData[] = [];

  getData(): SimpleData[] {
    const item = new SimpleData();
    item.id = 1;
    item.name = 'data';

    this.data = [...this.data, item];
    return this.data;
  }
}
