import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { ActivityGroupsController } from './activity.controller';
import { ActivityGroupsService } from './activity.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [ActivityGroupsController],
  providers: [ActivityGroupsService],
})
export class ActivityGroupsModule {}
