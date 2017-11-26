import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {CustomNodeService} from './../services/customnode.service';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
        ModalModule.forRoot()

  ],
  providers: [CustomNodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
