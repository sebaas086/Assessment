import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss']
})
export class CreateEditContactComponent {

  @Input() pageType: string="Create";
  @Output() CloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Input() ediData: any;

  public ContactsForm = this.fb.group({
    id:null,
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    phoneNumber: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });
  constructor(public modalService: NgbModal,
    private fb: UntypedFormBuilder,
    public router: Router,
    public contactService: ContactService,
    private toastr: ToastrService
  ){
  }

  ngOninit(){
  }

  ngOnChanges(){
    if(this.ediData!=null && this.ediData!=undefined && this.ediData!='')
      this.initializeForm();
  }

  initializeForm(){
    this.ContactsForm.controls["id"].setValue(this.ediData.id);
    this.ContactsForm.controls["firstName"].setValue(this.ediData.firstName);
    this.ContactsForm.controls["lastName"].setValue(this.ediData.lastName);
    this.ContactsForm.controls["email"].setValue(this.ediData.email);
    this.ContactsForm.controls["phoneNumber"].setValue(this.ediData.phoneNumber);
    this.ContactsForm.controls["address"].setValue(this.ediData.address);
    this.ContactsForm.controls["city"].setValue(this.ediData.city);
    this.ContactsForm.controls["state"].setValue(this.ediData.State);
    this.ContactsForm.controls["country"].setValue(this.ediData.country);
    this.ContactsForm.controls["postalCode"].setValue(this.ediData.postalCode);

    this.ContactsForm.markAsPristine();
  }
  Close(){
    if (this.pageType == "Create") {
      this.router.navigate(["/list"]);
    } else {
      this.CloseModal.emit();
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.ContactsForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
  }

  public getError(Error: any){
    // if (Error != undefined && Error.invalid == true) {
      if(Error.invalidStart != undefined)
        return 'Invalid Value';
      else if(Error.invalidEnd != undefined)
        return 'Invalid Value';
      if (Error.minLength != undefined && Error.maxLength != undefined) {
        if (Error.minLength > 0 && Error.maxLength > 0)
          return 'Should be minimum lenght of' + Error.minLength.toString() + ' Should be maximum length of' + Error.maxLength.toString();
        else if (Error.minLength == 0)
          return  'Should be maximum length of'+ Error.maxLength.toString();
      }
      if(Error.type == 'email' && Error.invalidMail == true)
        return 'Invalid Email';
      else if(Error.type == 'url' && Error.invalidUrl == true)
        return 'Invalid URL';
      else
        return '';
    // }
    // else 
    //   return'';
  }

  onSubmit() {
    var formData = this.ContactsForm.value;
    var saveData = {};
    if (formData.id != "" && formData.id != undefined && formData.id != null) {
      saveData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address??"",
        city: formData.city??"",
        State: formData.State??"",
        country: formData.country??"",
        postalCode: formData.postalCode??"",
        id: formData.id
      };
    } else {
      saveData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city??"",
        State: formData.State??"",
        country: formData.country??"",
        postalCode: formData.postalCode??""
      };
    }
    if (this.pageType == 'Create') {
      this.contactService.CreateContact(saveData).subscribe((result) => {
        this.toastr.success('Contact saved successfully');
        this.Close();
      }, (error) => {
        console.error(error.message);
        this.toastr.error(error.message,'Error');
      })
    } else {
      this.contactService.editContact(saveData).subscribe((result) => {
        this.toastr.success('Contact updated successfully');
        this.Close();
      }, (error) => {
        this.toastr.error(error.message,'Error');
      })
    }
  }

}
