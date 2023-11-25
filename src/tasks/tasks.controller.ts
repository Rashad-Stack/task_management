import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(parseInt(id));
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
