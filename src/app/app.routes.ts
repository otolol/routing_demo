import { Routes } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";
import { NoTaskComponent } from "./no-task/no-task.component";


export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
  },
  {
    path: 'tasks', //<domain>/tasks
    component: TaskListComponent
  }
]