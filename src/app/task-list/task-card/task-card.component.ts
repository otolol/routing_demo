import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../users/user-card/user-card.component';

export interface Task {
  id: number;
  title: string;
  description: string;
  userId: number;
  completed: boolean;
  dueDate?: Date;
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() assignedUser?: User;
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  onToggle() {
    this.toggle.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
} 