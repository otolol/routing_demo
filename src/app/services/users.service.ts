import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', tasksCount: 0 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', tasksCount: 0 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Project Manager', tasksCount: 0 },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'QA Engineer', tasksCount: 0 }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateTaskCount(userId: number, delta: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.tasksCount += delta;
      this.usersSubject.next([...this.users]);
    }
  }
} 