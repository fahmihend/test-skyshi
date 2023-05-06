import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as moment from 'moment';
import { Todos } from './todo.entity';

@Injectable()
export class TodoItemService {
  constructor(@InjectEntityManager() private conn: EntityManager) {
    this.conn = conn;
  }

  async createTodo(params: any) {
    try {
      if (!params.title || params.title === '' || params.title === null) {
        throw new Error('title cannot be null');
      }
      if (
        !params.activity_group_id ||
        params.activity_group_id === '' ||
        params.activity_group_id === null
      ) {
        throw new Error('activity_group_id cannot be null');
      }
      const now = moment().add(moment().utcOffset(), 'minutes').toDate();
      params['updatedAt'] = now;
      params['createdAt'] = now;
      params['is_active'] = params.isActive ? params.isActive : true;
      params['priority'] = params.priority ? params.priority : 'very-high';
      const test = await this.conn
        .getRepository(Todos)
        .createQueryBuilder()
        .insert()
        .values({ ...params })
        .execute();
      params['id'] = test.identifiers[0].id;
      return { data: params, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async getTodo(id?: number) {
    try {
      const query = this.conn.getRepository(Todos).createQueryBuilder();
      if (id && id !== null) {
        query.where('activity_group_id = :aid', { aid: id });
      }
      const result = await query.getMany();
      return { data: result, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async getTodoDetail(id?: number) {
    try {
      const query = this.conn.getRepository(Todos).createQueryBuilder();
      if (id && id !== null) {
        query.where('todo_id = :aid', { aid: id });
      }
      const result = await query.getMany();
      if (result.length === 0 && id && id !== null) {
        throw new Error(`Todo with ID ${id} Not Found`);
      }
      return { data: result, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async updateTodo(params: any, id: number) {
    try {
      const now = moment().add(moment().utcOffset(), 'minutes').toDate();
      const update = await this.conn
        .getRepository(Todos)
        .createQueryBuilder()
        .update()
        .set({
          ...params,
          updatedAt: now,
        })
        .where('todo_id = :aid', { aid: id })
        .execute();
      if (update.affected === 0) {
        throw new Error(`Todo with ID ${id} Not Found`);
      }
      const result = await this.conn
        .getRepository(Todos)
        .createQueryBuilder()
        .where('todo_id = :aid', { aid: id })
        .getOne();
      return { data: result, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async deleteTodo(id: number) {
    try {
      const result = await this.conn
        .getRepository(Todos)
        .createQueryBuilder()
        .where('todo_id = :aid', { aid: id })
        .getOne();
      if (!result) {
        throw new Error(`Todo with ID ${id} Not Found`);
      }
      await this.conn
        .getRepository(Todos)
        .createQueryBuilder()
        .delete()
        .where('todo_id = :aid', { aid: id })
        .execute();
      return { data: null, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }
}
