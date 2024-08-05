import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class UserService{
    constructor(public http: HttpClient){
    }

    authenticate(UserName: string, password: string){
        return this.http.post("api/Auth/login?username="+UserName+"&password="+password,[],{responseType: 'text'})
    }
}