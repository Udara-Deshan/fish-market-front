import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthenticationService} from "../../auth/authentication.service";
import {Observable} from "rxjs";
import {CustomerDTO} from "../dto/CustomerDTO";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url=environment.baseUrl+'customers';
  constructor(private httpClient:HttpClient,
              ) { }

  create(customerDTO:CustomerDTO):Observable<any>{
    return this.httpClient.post(this.url,customerDTO);
  }

  update(customerDTO:CustomerDTO):Observable<any>{
    return this.httpClient.put(this.url,customerDTO);
  }

  delete(id:number):Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`,{});
  }

  getAll(page:number,size:number):Observable<any>{
    return this.httpClient.get(this.url,{
      params:new HttpParams()
        .append('page',page)
        .append('size',size)
    });
  }
  search(page:number,size:number,value:string):Observable<any>{
    return this.httpClient.get(this.url,{
      params:new HttpParams()
        .append('page',page)
        .append('size',size)
        .append('value',value)
    });
  }

  getById(id: string):Promise<any>{
    // return this.httpClient.get(`${this.url}/${id}`,{});
    return new Promise((resolve, reject) => {
      this.httpClient.get(`${this.url}/${id}`,{})
        .toPromise().then(res => {
          resolve(res);
        },
        msg => {
          reject(msg);
        }
      );
    });
  }
}
