import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Activities } from './activity.entity';
import * as moment from 'moment';
import { CreateActivity, UpdateActivity } from './activity.dto';
@Injectable()
export class ActivityGroupsService {
  constructor(@InjectEntityManager() private conn: EntityManager) {
    this.conn = conn;
  }

  async createActivity(params: CreateActivity) {
    try {
      if (!params.title || params.title === '' || params.title === null) {
        throw new Error('title cannot be null');
      }
      const now = moment().add(moment().utcOffset(), 'minutes').toDate();
      params['updatedAt'] = now;
      params['createdAt'] = now;
      // throw new Error('test')
      const test = await this.conn
        .getRepository(Activities)
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

  async getActivity(id?: number) {
    try {
      const query = this.conn.getRepository(Activities).createQueryBuilder();
      if (id && id !== null) {
        query.where('activity_id = :aid', { aid: id });
      }
      const result = await query.getMany();
      if (result.length === 0 && id && id !== null) {
        throw new Error(`Activity with ID ${id} Not Found`);
      }
      return { data: result, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async updateActivity(params: UpdateActivity, id: number) {
    try {
      const now = moment().add(moment().utcOffset(), 'minutes').toDate();
      const update = await this.conn
        .getRepository(Activities)
        .createQueryBuilder()
        .update()
        .set({
          ...params,
          updatedAt: now,
        })
        .where('activity_id = :aid', { aid: id })
        .execute();
      if (update.affected === 0) {
        throw new Error(`Activity with ID ${id} Not Found`);
      }
      const result = await this.conn
        .getRepository(Activities)
        .createQueryBuilder()
        .where('activity_id = :aid', { aid: id })
        .getOne();
      return { data: result, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }

  async deleteActivity(id: number) {
    try {
      const result = await this.conn
        .getRepository(Activities)
        .createQueryBuilder()
        .where('activity_id = :aid', { aid: id })
        .getOne();
      if (!result) {
        throw new Error(`Activity with ID ${id} Not Found`);
      }
      await this.conn
        .getRepository(Activities)
        .createQueryBuilder()
        .delete()
        .where('activity_id = :aid', { aid: id })
        .execute();
      return { data: null, status: 'Success' };
    } catch (e) {
      throw e;
    }
  }
}
