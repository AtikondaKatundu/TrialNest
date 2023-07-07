import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v1 as uuid} from 'uuid'
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilter } from './dtos/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getTasks(): Task[]{
        return this.tasks;
    }

    getTasksFiltered(filterDto: GetTasksFilter): Task[]{
        const {status, search} = filterDto

        let tasks = this.getTasks()

        if (status){
            tasks = tasks.filter(task => task.status === status)
        }
        if (search){
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
                )
        }

        return tasks;
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
        const found = this.tasks.find(task => task.id === id)
    
        if (!found){
            throw new NotFoundException(`Task with ID: "${id}" not found`)
            //throw exception 404 not found
        }

        return found
    }

    deleteTask(id: string){
     const found = this.getTaskById(id)
     this.tasks = this.tasks.filter(task =>task.id !== found.id);
     return 'Task deleted'
    }

    updateTaskStatus(id : string, status : TaskStatus) : Task{
        const task : Task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
