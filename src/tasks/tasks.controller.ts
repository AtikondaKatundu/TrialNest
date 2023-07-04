import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks() : Task[]{
        return this.tasksService.getTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
       return this.tasksService.createTask(createTaskDto); 
    }

}
