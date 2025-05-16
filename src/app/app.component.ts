import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { User } from './shared/interfaces/user.interface';
import { TasksService } from './services/tasks.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, UsersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task Manager';
  users: User[] = [];

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
