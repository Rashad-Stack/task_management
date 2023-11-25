import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class getTaskFilterDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
