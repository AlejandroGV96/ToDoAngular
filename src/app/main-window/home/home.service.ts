import { Injectable } from '@angular/core';
import {IListItem} from "./home.component";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor() { }

  public get name(): string {
    // @ts-ignore
    return localStorage.getItem('name');
  }

  public set name(value: string) {
    localStorage.setItem('name', value);
  }

  public get task(): IListItem {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('task'))
  }

  public set task(value:IListItem) {
    localStorage.setItem('task',JSON.stringify(value))
  }

  public storeTask(task: IListItem){
    console.log(task.date)
    localStorage.setItem(
      task.date,
      JSON.stringify(task)
    )
  }

  public getTask(task: IListItem): IListItem {
    // @ts-ignore
    let x: IListItem = JSON.parse(localStorage.getItem(
        task.date
      )
    )
    console.log(x);
    return x;
  }

  public deleteTask(task: IListItem) {
    Object.keys(localStorage).forEach(key => {
      console.log(task.date, key)
      // @ts-ignore
      if ( task.date === key )
      {
        localStorage.removeItem(key);
      }
    });
  }

  public getAllTasks(): IListItem[] {
    let tasksList: IListItem[] = [];
    Object.keys(localStorage).forEach(key => {
      // @ts-ignore
      let x: IListItem = JSON.parse(localStorage.getItem(key))
      tasksList.push(x);
    });
    return tasksList;
  }
}
