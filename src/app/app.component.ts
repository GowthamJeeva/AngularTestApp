import { Component,Inject, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import {CustomNodeService} from './../services/customnode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CustomNodeService]
})
export class AppComponent {
  employeeData;
  public languageData: any;
  action:any = false;
  responseData:any;
  responseDataFailure:any;
  autoClose:any = false;

userForm = new FormGroup({
       name: new FormControl(),
       code: new FormControl(),
    });

  public modalRef: BsModalRef; // {1}
  constructor(private modalService: BsModalService,private customNodeService:CustomNodeService) {} // {2}
ngOnInit() {
     
   }
  public openModal(template) {
  if(!this.action)
     this.userForm.patchValue({'name':'', 'code':'',});
    this.modalRef = this.modalService.show(template); // {3}

  }
  public closing(){
  this.autoClose = true;
  setTimeout(() => {
    this.autoClose = false;
  },5000)
  }

  deleteEmployee(data){
    this.customNodeService.deleteEmployee(data.code).subscribe((res) => {
      this.showAll();
      this.closing();
      this.responseData = 'Employee details are deleted';

      },(err) =>{
      this.closing();
      this.responseDataFailure = 'Server error';
      }
      );
  }

  editEmployee(template,data){
    this.userForm.patchValue({'name':data.name, 'code':data.code,});
    this.action = true;
    this.openModal(template);
  }

  save(){
    if(this.action){
    this.customNodeService.editEmployee(this.userForm.value).subscribe((res) => {
      this.modalRef.hide();
      this.showAll();
      this.action = false;
      this.closing();
      this.responseData = 'The employee details are updated';
      },(err) =>{
      this.closing();
      this.responseDataFailure = 'Server error';
      }
      );
    }
    else{
      this.customNodeService.createEmployee(this.userForm.value).subscribe((res) => {
      this.modalRef.hide();
      this.showAll();
      this.closing();
      this.responseData = 'The employee details are added';
      },(err) =>{
      this.closing();
      this.responseDataFailure = 'Server error';
      }
      );
      }
  }

  showAll(){
  this.customNodeService.readEmployees().subscribe((res) => {
    this.employeeData = res.json();
  },(err) => {
    alert("failure");
  })
  }
}
