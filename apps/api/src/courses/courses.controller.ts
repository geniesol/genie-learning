import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll(@Query('region') region: string) {
    return this.coursesService.findAll(region);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.coursesService.findOne(slug);
  }

  @Post()
  async create(@Body() body: any) {
    return this.coursesService.create(body);
  }
}
