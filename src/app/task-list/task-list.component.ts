import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent, Task } from './task-card/task-card.component';
import { User } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() users: User[] = [];
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  getAssignedUser(userId: number): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  onTaskToggled(task: Task) {
    this.toggle.emit(task);
  }

  onTaskDeleted(taskId: number) {
    this.delete.emit(taskId);
  }
} 