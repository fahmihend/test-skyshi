import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoItemService } from './todo.service';
import { response, responseError } from 'src/helper/response.helper';

@Controller('todo-items')
export class TodoItemController {
  constructor(private todoItemService: TodoItemService) {}

  @Post('/')
  async createTodo(@Body() body: any) {
    try {
      const result = await this.todoItemService.createTodo(body);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError({ status: 'Bad Request', message: e.message }, 400);
    }
  }

  @Get('/')
  async getAllTodo(@Req() req: any) {
    try {
      const param = req.query.activity_group_id;
      const result = await this.todoItemService.getTodo(param);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }

  @Get('/:id')
  async getOneTodo(@Param('id') id: number) {
    try {
      const result = await this.todoItemService.getTodoDetail(id);
      return response(result.status, result.status, result.data[0]);
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }

  @Patch('/:id')
  async updateActivity(@Body() body: any, @Param('id') id: number) {
    try {
      const result = await this.todoItemService.updateTodo(body, id);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }

  @Delete('/:id')
  async deleteActivity(@Param('id') id: number) {
    try {
      const result = await this.todoItemService.deleteTodo(id);
      return response(result.status, result.status, {});
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }
}
