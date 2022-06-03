import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private httpClient:HttpClient,
  ) { }

  getData():Observable<any>{
    return this.httpClient.get('http://localhost:8090/Dashboard');
  }
}
