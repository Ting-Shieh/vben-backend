import { Injectable } from '@nestjs/common';
import { MENU_LIST } from './menu.data';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  // findAll(): Promise<string> {
  //   return new Promise((resolve, reject) => resolve(MENU_LIST));
  // }
  findAll() {
    // return this.menuRepository.findBy({ active: 1 });
    return this.menuRepository.find({
      // where: { active: 1 },
      order: { active: 'DESC' },
    });
  }
  findActive() {
    return this.menuRepository.find({
      where: { active: 1 },
      order: { active: 'DESC' },
    });
  }
  findOne(id: number) {
    return this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }
  async create(menu: Partial<Menu>) {
    const createMenu = await this.menuRepository.create(menu);
    return await this.menuRepository.save(createMenu);
  }
  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menuDB = await this.findOne(id);
    const newMenu = this.menuRepository.merge(menuDB, updateMenuDto);
    return await this.menuRepository.save(newMenu);
  }
}
