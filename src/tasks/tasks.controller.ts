import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get(":id")
  async getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  /*
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: getTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }



  @Patch(":id")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(parseInt(id), status);
  }

  @Delete(":id")
  deleteTaskById(@Param("id") id: string): void {
    this.tasksService.deleteTaskById(parseInt(id));
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
  */
}
