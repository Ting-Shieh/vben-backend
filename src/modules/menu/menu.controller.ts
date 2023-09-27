import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  getAllMenus() {
    return wrapperResponse(this.menuService.findAll(), '成功獲取全部菜單');
  }
  @Get('active')
  getActiveMenus() {
    return wrapperResponse(this.menuService.findActive(), '獲取全部激活菜單');
  }
  @Post()
  addUser(@Body() body: any): any {
    // console.log('createMenuDto', createMenuDto);
    const menuReq = body.data as CreateMenuDto as unknown as Menu;
    return wrapperResponse(this.menuService.create(menuReq), '菜單創建成功');
  }
}
