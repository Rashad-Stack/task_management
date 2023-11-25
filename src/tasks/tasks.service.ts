import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: Date.now(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}