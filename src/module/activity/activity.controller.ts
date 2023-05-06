import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { response, responseError } from 'src/helper/response.helper';
import { ActivityGroupsService } from './activity.service';
import { CreateActivity, UpdateActivity } from './activity.dto';

@Controller('activity-groups')
export class ActivityGroupsController {
  constructor(private activityGroupsService: ActivityGroupsService) {}

  @Post('/')
  async createActivity(@Body() body: CreateActivity) {
    try {
      const result = await this.activityGroupsService.createActivity(body);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError({ status: 'Bad Request', message: e.message }, 400);
    }
  }

  @Get('/')
  async getAllActivity() {
    try {
      const result = await this.activityGroupsService.getActivity();
      // if (result.message) return response(result.status, result.message, null);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError(e.message, 422);
    }
  }

  @Get('/:id')
  async getOneActivity(@Param('id') id: number) {
    try {
      const result = await this.activityGroupsService.getActivity(id);
      // if (result.message) return response(result.status, result.message, null);
      return response(result.status, result.status, result.data[0]);
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }

  @Patch('/:id')
  async updateActivity(@Body() body: UpdateActivity, @Param('id') id: number) {
    try {
      const result = await this.activityGroupsService.updateActivity(body, id);
      return response(result.status, result.status, result.data);
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
    }
  }

  @Delete('/:id')
  async deleteActivity(@Param('id') id: number) {
    try {
      const result = await this.activityGroupsService.deleteActivity(id);
      // if (result.message) return response(result.status, result.message, null);
      return response(result.status, result.status, {});
    } catch (e) {
      return responseError({ status: 'Not Found', message: e.message }, 404);
      // return responseError(e.message, 422);
    }
  }
}
