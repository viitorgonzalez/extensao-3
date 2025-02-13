import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getUserById } from '../supabase/queries/getUserById'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  getUserById(id: string) {
    return getUserById("1a6f9b17-6068-4651-8f88-9e4766112c2d");
  }

}
