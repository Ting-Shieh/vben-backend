import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { wrapperResponse } from 'src/utils';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './menu.entity';
import { UpdateMenuDto } from './dto/update-menu.dto';

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
  addMenu(@Body() body: any): any {
    // console.log('createMenuDto', createMenuDto);
    const menuReq = body.data as CreateMenuDto as unknown as Menu;
    return wrapperResponse(this.menuService.create(menuReq), '菜單創建成功');
  }
  @Put(':id')
  updateMenu(@Param('id') id: string, @Body() body: any): any {
    const menuReq = (body.data || body) as UpdateMenuDto;
    return wrapperResponse(
      this.menuService.update(+id, menuReq),
      '菜單更新成功',
    );
  }
}
