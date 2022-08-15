import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {TaskModel} from "../../task.model";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.tasksUrl)
  }

  getTask(id: number): Observable<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<TaskModel>(url).pipe(
      tap(_ => console.log(`fetched task id=${id}`))
    );
  }

  updateTask(task: TaskModel): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      tap(_ => console.log(`updated task id=${task.id}`))
    );
  }

  addTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.tasksUrl, task, this.httpOptions).pipe(
      tap((newTask: TaskModel) => console.log(`added task w/ id=${newTask.id}`))
    );
  }

  deleteTask(id: number): Observable<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<TaskModel>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted task id=${id}`))
    );
  }
}
