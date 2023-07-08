import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilter{
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNoEmpty()
    search: string;
}

function IsNoEmpty(): (target: GetTasksFilter, propertyKey: "search") => void {
    throw new Error("Function not implemented.");
}
