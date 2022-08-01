import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MainWindowComponent } from "./main-window.component";
import { MainWindowRoutingModule } from "./main-window-routing.module";
import { HomeComponent } from "./home/home.component";
import { AngularMaterialModule } from "../angular-material.module";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    MainWindowComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainWindowRoutingModule,
    AngularMaterialModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
})
export class MainWindowModule { }
