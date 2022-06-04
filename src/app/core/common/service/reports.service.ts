import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  url = environment.baseUrl + 'report';

  constructor(private httpClient: HttpClient,
  ) {
  }

  getReport(type: string): Observable<any> {
    return this.httpClient.get(this.url,{
      params:new HttpParams()
        .append('type',type),
      responseType: 'blob'
    })
  }
}

