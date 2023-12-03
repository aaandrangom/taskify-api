import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { createTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createTask(task: createTaskDTO) {
    const taskFound = await this.taskRepository.findOne({
      where: {
        name: task.name,
      },
    });

    if (taskFound) {
      return new HttpException('Task already exists', HttpStatus.CONFLICT);
    }

    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  getTasks() {
    return this.taskRepository.find();
  }

  async getTask(id: number) {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!taskFound) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return taskFound;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateTask(id: number, task: UpdateTaskDTO) {
    const taskFound = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!taskFound) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const updateTask = Object.assign(taskFound, task);

    return this.taskRepository.save(updateTask);
  }
}
