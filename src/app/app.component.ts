import { Component,Inject, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import {CustomNodeService} from './../services/customnode.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CustomNodeService]
})
export class AppComponent {
  title = 'app';
  public languageData: any;

userForm = new FormGroup({
       name: new FormControl(),
       code: new FormControl(),
    });

  public modalRef: BsModalRef; // {1}
  constructor(private http:Http,private modalService: BsModalService,private customNodeService:CustomNodeService) {
 

  } // {2}
ngOnInit() {
     
   }
  public openModal(template) {
    this.modalRef = this.modalService.show(template); // {3}

  }

  save(){
      this.customNodeService.createEmployee(this.userForm.value).subscribe((res) => {
        console.log(res);
      }



      );
  }
}
