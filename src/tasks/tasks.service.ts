import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async getTaskById(id: number, user: User): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id, userId: user.id });

    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder("task");

    query.where("task.userId = :userId", { userId: user.id });

    if (search) {
      query.andWhere(
        "task.title LIKE :search OR task.description LIKE :search",
        { search: `%${search}%` },
      );
    }

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
