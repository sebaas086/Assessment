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
    this.authToken=this.userService.LocalToken;
  }

  ngOnInit(){
    // this.router.navigateByUrl("list")
    this.authToken=this.userService.LocalToken;
  }

  ngOnChanges(){
    this.authToken=this.userService.LocalToken;
  }

  OpenUserModal(){
    this.authToken=this.userService.LocalToken;
    this.modalReference = this.modalService.open(this.content,{ size: 'xl' });
  }

  closeModal(){
    this.modalReference.close();
  }

  Login(){
    this.userService.authenticate(this.UserName,this.password).subscribe((result)=>{
      this.toastr.success("Logged in successfully");
      localStorage.setItem("authtoken",result.toString());
      localStorage.setItem("loggedinUser",this.UserName.toString());
      this.modalReference.close();
      this.userService.LocalToken=result;
      this.authToken=result;
      this.userService.LoggedInUser=this.UserName;
      this.UserName='';
      this.password='';
    },(error)=>{
      this.toastr.error(error.message,"Error")
    })
  }

  Logout(){
    localStorage.clear();
    this.userService.LocalToken='';
    this.authToken=null;
    this.modalReference.close();
  }
}
