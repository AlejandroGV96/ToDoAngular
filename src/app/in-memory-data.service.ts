import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { TaskModel } from "./task.model";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let tasks: TaskModel[] = [
      {id: 1, createdAt: new Date("2022-01-01"), content: "Clean the house"}
    ];
    return {tasks};
  }

  genId(tasks: TaskModel[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 2;
  }
}
