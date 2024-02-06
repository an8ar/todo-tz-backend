import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.body.dto';
import { UpdateTaskDto } from './dto/update-task.body.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post('')
  async create(
    @Body() data: CreateTaskDto,
    @UserId() userId: number,
  ): Promise<Todo> {
    return this.todoService.createTask(data, userId);
  }
  @Get('')
  async getAll(@UserId() userId: number): Promise<Todo[]> {
    return this.todoService.getAllTasks(userId);
  }
  @Delete('/:id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTask(+id);
  }
  @Put('/:id')
  async complete(@Param('id') todoId: string, @Body() data: UpdateTaskDto) {
    return this.todoService.updateTask(+todoId, data);
  }
  @Get('statuses')
  getAllStatuses() {
    return this.todoService.getAllStatuses();
  }
}
