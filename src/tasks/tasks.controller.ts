import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilter } from './dtos/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto: GetTasksFilter) : Task[]{
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksFiltered(filterDto);
        }
        else{
            return this.tasksService.getTasks();
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
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
        @Body('status', TaskStatusValidationPipe) status : TaskStatus,
        //new instance of the TaskStatusValidationPipe made by nest in the background
        ):  Task{
        return this.tasksService.updateTaskStatus(id,status);
    }
}
