import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { TodoItemController } from './todo.controller';
import { TodoItemService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [TodoItemController],
  providers: [TodoItemService],
})
export class TodoItemModule {}
