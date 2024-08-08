import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class UserService{

    public LocalToken: any='';
    public LoggedInUser: any='';

    constructor(public http: HttpClient){
        this.LocalToken=localStorage.getItem("authtoken");
    }

    ngOnChanges(){
        this.LocalToken=localStorage.getItem("authtoken");
    }

    authenticate(UserName: string, password: string){
        return this.http.post("api/Auth/login?username="+UserName+"&password="+password,[],{responseType: 'text'})
    }
}