import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get(":id")
  async getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete(":id")
  async deleteTaskById(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteTaskById(id);
  }

  // @Patch(":id")
  // updateTaskStatus(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  // ): Promise<Task> {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto, user);
  }
}
