import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent, Task } from './task-card/task-card.component';
import { User } from '../shared/interfaces/user.interface';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    combineLatest([
      this.tasksService.getTasks(),
      this.route.paramMap.pipe(
        map((param: ParamMap) => Number(param.get('userId')) || -1)
      )
    ]).subscribe(([tasks, userId]) => {
      this.tasks = tasks.filter(task => task.userId === userId)
    })

    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getAssignedUser(userId: number): User | undefined {
    return this.usersService.getUserById(userId);
  }

  onTaskToggled(task: Task) {
    this.tasksService.toggleTask(task.id);
  }

  onTaskDeleted(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }
} 