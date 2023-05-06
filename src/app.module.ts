import { Module } from '@nestjs/common';
import { ActivityGroupsModule } from './module/activity/activity.module';
import { TodoItemModule } from './module/todo/todo.module';

@Module({
  imports: [ActivityGroupsModule, TodoItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
