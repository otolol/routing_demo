import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../task-list/task-card/task-card.component';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    { 
      id: 1, 
      title: 'Complete project documentation', 
      description: 'Write comprehensive documentation for the project',
      userId: 1,
      completed: false, 
      dueDate: new Date('2024-03-20') 
    },
    { 
      id: 2, 
      title: 'Review pull requests', 
      description: 'Review and merge pending pull requests',
      userId: 2,
      completed: true, 
      dueDate: new Date('2024-03-18') 
    },
    { 
      id: 3, 
      title: 'Update dependencies', 
      description: 'Update all project dependencies to latest versions',
      userId: 3,
      completed: false, 
      dueDate: new Date('2024-03-22') 
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor(private usersService: UsersService) {
    // Initialize task counts
    this.updateAllTaskCounts();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.getNextId()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
    this.usersService.updateTaskCount(task.userId, 1);
  }

  deleteTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.tasksSubject.next([...this.tasks]);
      this.usersService.updateTaskCount(task.userId, -1);
    }
  }

  toggleTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  private getNextId(): number {
    return Math.max(...this.tasks.map(t => t.id), 0) + 1;
  }

  private updateAllTaskCounts(): void {
    const userTaskCounts = new Map<number, number>();
    this.tasks.forEach(task => {
      const count = userTaskCounts.get(task.userId) || 0;
      userTaskCounts.set(task.userId, count + 1);
    });
    
    userTaskCounts.forEach((count, userId) => {
      this.usersService.updateTaskCount(userId, count);
    });
  }
} 