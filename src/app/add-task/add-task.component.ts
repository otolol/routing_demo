import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../users/user-card/user-card.component';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { Task } from '../task-list/task-card/task-card.component';

export interface NewTask {
  title: string;
  description: string;
  userId: number;
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  users: User[] = [];
  newTask: NewTask = {
    title: '',
    description: '',
    userId: 0
  };

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addTask() {
    if (this.newTask.title.trim() && this.newTask.userId) {
      const taskToAdd: Omit<Task, 'id'> = {
        ...this.newTask,
        userId: Number(this.newTask.userId),
        completed: false,
        dueDate: new Date()
      };
      this.tasksService.addTask(taskToAdd);
      this.resetForm();
    }
  }

  private resetForm() {
    this.newTask = {
      title: '',
      description: '',
      userId: 0
    };
  }
} 