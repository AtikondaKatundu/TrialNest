import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuid} from 'uuid'
import { CreateTaskDto } from './dtos/create-task.dto';
@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getTasks(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto : CreateTaskDto){
        const { title, description } = createTaskDto
        
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string) : Task{
        return this.tasks.find(task => task.id === id)
    }
}
