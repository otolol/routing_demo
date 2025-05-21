import { Routes } from "@angular/router";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";
import { NoTaskComponent } from "./no-task/no-task.component";


export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', //<domain>/users/<uid>
    component: UserTasksComponent
  }
  // {
  //   path: 'tasks', //<domain>/tasks
  //   component: TaskListComponent
  // }
]