import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CoolingRoomDTO} from "../dto/CoolingRoomDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoolingRoomService {
  url=environment.baseUrl+'rooms';
  constructor(private httpClient:HttpClient,
  ) { }

  create(coolingRoomDTO:CoolingRoomDTO):Observable<any>{
    return this.httpClient.post(this.url,coolingRoomDTO);
  }

  update(coolingRoomDTO:CoolingRoomDTO):Observable<any>{
    return this.httpClient.put(this.url,coolingRoomDTO);
  }

  delete(id:number):Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`,{});
  }

  getAll(page:number,size:number,status:number):Observable<any>{
    return this.httpClient.get(this.url,{
      params:new HttpParams()
        .append('page',page)
        .append('size',size)
        .append('status',status)
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
  getAllAvailableCoolingRoomsByType(page:number,size:number,typeId:number):Observable<any>{
    return this.httpClient.get(this.url+'/'+typeId,{
      params:new HttpParams()
        .append('page',page)
        .append('size',size)
    });
  }
}
