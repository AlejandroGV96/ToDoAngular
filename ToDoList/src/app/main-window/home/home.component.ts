import {Component, OnInit} from '@angular/core';
import {NewTaskComponent} from "../../new-task.component";
import {MatDialog} from "@angular/material/dialog";
import {HomeService} from "./home.service.ts.service";

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

  toDoList: IListItem[] = [];
  completedTasks: number = 0;
  constructor(
    private dialog: MatDialog,
    private homeService: HomeService
  ) {
    this.toDoList = this.homeService.getAllTasks();
  }

  ngOnInit(): void {
  }

  addTask(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      hasBackdrop: true,
      panelClass: ['modal'],
      backdropClass: 'modal-background',
      //data: "init data"
    })
    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      let date = new Date;
      let task: IListItem = {
        date: date.toUTCString(),
        content: result
      };
      this.toDoList.push(task);
      this.homeService.storeTask(task);
      console.log(this.homeService.getTask(task));
      //TODO: UPDATE LIST ON REMOVE!
    })
  }

  completeTask(item: IListItem): void {
    this.toDoList =  this.toDoList.filter( current => {
      return current.content !== item.content;
    })
  }

  deleteTask(item: IListItem): void {
    this.toDoList =  this.toDoList.filter( current => {
      return current.content !== item.content;
    })
    this.homeService.deleteTask(item);
  }
}
