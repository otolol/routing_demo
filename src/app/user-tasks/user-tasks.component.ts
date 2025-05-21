import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../task-list/task-card/task-card.component';
import { User } from '../shared/interfaces/user.interface';
import { TasksService } from '../services/tasks.service';
import { UsersService } from '../services/users.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {
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
      this.tasks = tasks.filter(task => task.userId === userId);
    });

    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onTaskToggled(task: Task) {
    this.tasksService.toggleTask(task.id);
  }

  onTaskDeleted(taskId: number) {
    this.tasksService.deleteTask(taskId);
  }
} 