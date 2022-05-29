import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StockDTO} from "../dto/StockDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  url=environment.baseUrl+'stocks';
  constructor(private httpClient:HttpClient,
  ) { }

  create(stockDTO:StockDTO):Observable<any>{
    return this.httpClient.post(this.url,stockDTO);
  }

  update(stockDTO:StockDTO):Observable<any>{
    return this.httpClient.put(this.url,stockDTO);
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
