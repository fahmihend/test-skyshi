import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from 'src/helper/config.helper';
import { Activities } from 'src/module/activity/activity.entity';
import { Todos } from 'src/module/todo/todo.entity';

export const typeOrmConfig = {
  type: 'mysql',
  host: Config.get('MYSQL_HOST'),
  port: Config.getNumber('MYSQL_PORT'),
  username: Config.get('MYSQL_USER'),
  password: Config.get('MYSQL_PASSWORD'),
  database: Config.get('MYSQL_DBNAME'),
  entities: [Todos, Activities],
  logging: false,
  synchronize: true,
} as TypeOrmModuleOptions;
