import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { getTaskFilterDto } from "./dto/get-task-filter.dto";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: getTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      return this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return task;
  }

  updateTaskStatus(id: number, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: number): void {
    const { id: taskId } = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return null;
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
