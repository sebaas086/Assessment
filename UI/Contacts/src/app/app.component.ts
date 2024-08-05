import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('content', { static: false }) content: ElementRef | undefined;
  title = 'Contacts';
  authToken: any;
  UserName:string='';
  password:string='';
  public modalReference: any;
  constructor(public router: Router,
    public modalService: NgbModal,
    private toastr: ToastrService,
    public userService: UserService
  ){
  }

  ngOnInit(){
    // this.router.navigateByUrl("list")
    this.authToken=localStorage.getItem("authtoken");
  }

  OpenUserModal(){
    this.modalReference = this.modalService.open(this.content,{ size: 'xl' });
  }

  closeModal(){
    this.modalReference.close();
  }

  Login(){
    this.userService.authenticate(this.UserName,this.password).subscribe((result)=>{
      this.toastr.success("Logged in successfully");
      localStorage.setItem("authtoken",result.toString());
      this.modalReference.close();
      this.authToken=result;
      this.UserName='';
      this.password='';
    },(error)=>{
      this.toastr.error(error.message,"Error")
    })
  }
}
