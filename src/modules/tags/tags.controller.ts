import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TagsService } from './tags.service';
import { Tags, Todo } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.body.dto';
import { TodoIdDto } from '../todo/dto/todo-id.body.dto';
import { UpdateTagDto } from './dto/update-tag.body.dto';
import { BatchPayload } from './interfaces/batch-payload.interface';
import { UserId } from 'src/common/decorators/user-id.decorator';

@Controller('tags')
@UseGuards(AuthGuard)
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Get() //
  async getAllTag(@UserId() userId: number): Promise<Tags[]> {
    return this.tagsService.getAllTags(userId);
  }
  @Get('/:id/todos') //
  async getTagTodos(
    @Param() { id }: { id: string },
    @UserId() userId: number,
  ): Promise<Todo[]> {
    return this.tagsService.getTagTodos(+id, userId);
  }
  @Post() //
  async createTag(
    @Body() data: CreateTagDto,
    @UserId() userId: number,
  ): Promise<Tags> {
    return this.tagsService.createTag(data, userId);
  }

  @Delete('/:id') //
  async deleteTag(@Param() { id }: { id: string }): Promise<Tags> {
    return this.tagsService.deleteTag(+id);
  }
  @Post('/:id/assign') //
  async asignTodo(
    @Param() { id }: { id: string },
    @Body() data: TodoIdDto[],
  ): Promise<BatchPayload> {
    console.log(id);
    return this.tagsService.assignTodo(data, +id);
  }
  @Put('/:id') //
  async updateTag(
    @Param() { id }: { id: string },
    @Body() { name }: UpdateTagDto,
  ): Promise<Tags> {
    return this.tagsService.updateTag(+id, name);
  }
  @Get('/:id')
  async getTag(
    @Param() { id }: { id: string },
    @UserId() userId: number,
  ): Promise<Tags> {
    return this.tagsService.getTag(+id, userId);
  }
}
