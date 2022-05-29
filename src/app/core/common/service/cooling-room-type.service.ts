import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CoolingRoomTypeDTO} from "../dto/CoolingRoomTypeDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoolingRoomTypeService {
  url=environment.baseUrl+'types';
  constructor(private httpClient:HttpClient,
  ) { }

  create(coolingRoomTypeDTO:CoolingRoomTypeDTO):Observable<any>{
    return this.httpClient.post(this.url,coolingRoomTypeDTO);
  }

  update(coolingRoomTypeDTO:CoolingRoomTypeDTO):Observable<any>{
    return this.httpClient.put(this.url,coolingRoomTypeDTO);
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

  getById(id: number):Promise<any>{
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
