import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ContactService{
    constructor(public http: HttpClient){
    }

    GetList(){
        return this.http.get("api/Contacts/GetList");
    }

    CreateContact(saveData:any){
        return this.http.post("api/Contacts/create",saveData);
    }
    
    editContact(saveData:any){
        return this.http.post("api/Contacts/edit",saveData);
    }
    
    deleteContact(id:any){
        return this.http.delete("api/Contacts/delete/"+id);
    }
}