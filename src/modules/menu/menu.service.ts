import { Injectable } from '@nestjs/common';
import { MENU_LIST } from './menu.data';

@Injectable()
export class MenuService {
  // constructor() {}

  findAll(): Promise<string> {
    return new Promise((resolve, reject) => resolve(MENU_LIST));
  }
}
