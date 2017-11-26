import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomNodeService {
    private url: string = '/?'+"ta=ga";

    constructor(private http: Http) { }

   
    readEmployees() {
        return this.http.get(this.url).map((response: Response) => response)
    }

    editEmployee(languagesObj: any) {
        return this.http.patch(this.url, languagesObj).map((response: Response) => response)
    }

    deleteEmployee(langCode: any) {
        return this.http.delete(this.url + '?code=' + langCode.code + '&name=' + langCode.name).map((response: Response) => response)
    }

   
    createEmployee(languagesObj: any) {
        console.log(languagesObj);
        return this.http.post(this.url, {emp:languagesObj}).map((response: Response) =>{console.log(response)} )
    }

}