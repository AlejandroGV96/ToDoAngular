import {Component, OnInit} from '@angular/core';
import {NewTaskComponent} from "../../new-task.component";
import {MatDialog} from "@angular/material/dialog";
import {HomeService} from "./home.service";
import {TaskService} from "./task.service";
import {TaskModel} from "../../task.model";
import {InMemoryDataService} from "../../in-memory-data.service";
import {MatListItem} from "@angular/material/list";

export interface IListItem {
  date: string;
  content: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: TaskModel[] = [];
  completedTasks: {content: string, date: Date}[] = [];
  private _openDialog(data: string | null) {
    return this.dialog.open(NewTaskComponent, {
      hasBackdrop: true,
      panelClass: ['modal'],
      backdropClass: 'modal-background',
      data: data
    })
  }

  constructor(
    private dialog: MatDialog,
    private homeService: HomeService,
    private tasksService: TaskService,
    private dataService: InMemoryDataService
  ) {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe({
      next: (value) => {
        this.tasks = value;
      }
    })
  }

  ngOnInit(): void {
  }

  addTask(): void {
    const dialogRef = this._openDialog(null);
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      let task: TaskModel = {
        id: this.dataService.genId(this.tasks),
        content: result,
        createdAt: new Date()
      };
      this.tasksService.addTask(task).subscribe({
        complete: () => {
          this.getTasks();
        }
      });
    })
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe({
      complete: () => {
        this.getTasks();
      }
    });
  }
  updateTask(id: number): void {
    let task = this.tasks.find(task => task.id === id);
    const dialogRef = this._openDialog(task?.content || null);
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      let updatedTask: TaskModel = {
        id: id,
        content: result,
        createdAt: task!.createdAt
      };
      this.tasksService.updateTask(updatedTask).subscribe({
        complete: () => {
          this.getTasks();
        }
      });
    })
  }

  completeTask(task: TaskModel){
    this.tasksService.deleteTask(task.id).subscribe({
      next: () => {
        this.getTasks();
      },
      complete: () => {
        this.completedTasks.push({
          content: task.content,
          date: new Date()
        })
      }
    });
  }

  disableItem(el: MatListItem) {
    el.disabled = true;
  }
}
