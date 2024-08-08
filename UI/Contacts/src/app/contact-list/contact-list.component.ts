import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @ViewChild('content', { static: false }) content: ElementRef | undefined;
  @ViewChild('delete_content', { static: false }) delete_content: ElementRef | undefined;

  authToken: any;
  UserName:string='';
  password:string='';
  public modalReference: any;
  public contactList: any=[];
  public editItem: any;
  public deleteItem: any;
  public pageSettings: any;
  public filterOptions: any;
  public SortColumnDetails: any={column:'firstName',direction:'asc'}

  constructor(public modalService: NgbModal,
    public contactService: ContactService,
    private toastr: ToastrService,
    public userService: UserService
  ){
  }

  ngOnInit(){
    this.getList();
    this.authToken=this.userService.LocalToken;
  }

  getList(){
    this.contactService.GetList().subscribe((result)=>{
      this.contactList=result;
    }, (error)=>{
      console.log(error)
    })
  }

  open(item: any) {
		this.modalReference = this.modalService.open(this.content,{ size: 'xl' });
    this.editItem=item;
	}

  sortByColumn(column: string, direction = 'desc') {
    this.contactList.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[column] > b[column] ? (direction === 'desc') ? -1 : 1 : a[column] < b[column] ? (direction === 'desc') ? 1 : -1 : 0)
  }
  
  sort(colName:any) {
    var sortDirection= this.SortColumnDetails.direction=='asc'?'desc':'asc';
    console.log(sortDirection)
    if(this.SortColumnDetails.column==colName){
      this.sortByColumn(colName,sortDirection);
      this.SortColumnDetails.column=colName;
      this.SortColumnDetails.direction=sortDirection;
    } else{
      this.SortColumnDetails.column=colName;
      this.SortColumnDetails.direction='asc';
      this.sortByColumn(colName,'asc');
    }
  }

  CloseModal(event: any){
    this.modalReference.close();
    this.getList();
  }
  
  ClosedeleteModal(event: any){
    this.modalReference.close();
  }

  deleteContact(row:any){
    this.modalReference=this.modalService.open(this.delete_content,{size:"md"});
    this.deleteItem=row;
  }

  onDeleteConfirm(){
    this.contactService.deleteContact(this.deleteItem.id).subscribe((result)=>{
      this.toastr.success('Cotnact deleted successfully');
      this.contactList=this.contactList.filter((c: any)=>c!=this.deleteItem);
      this.modalReference.close();
      this.deleteItem=null;
    },(error)=>{
      this.toastr.error(error.message,'Error');
      this.modalReference.close();
    })
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
