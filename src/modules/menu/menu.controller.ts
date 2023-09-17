import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  getAllMenus() {
    return wrapperResponse(this.menuService.findAll(), '獲取全部菜單家Success');
  }
}
