import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilter } from './dtos/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilter) : Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksFiltered(filterDto);
        }
        else{
            return this.tasksService.getTasks();
        }
        
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
       return this.tasksService.createTask(createTaskDto); 
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) : Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string,
        @Body('status') status : TaskStatus,
        ):  Task{
        return this.tasksService.updateTaskStatus(id,status);
    }
}
