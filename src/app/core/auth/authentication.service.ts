import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthUserDTO} from "./AuthUserDTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.authUrl;

  private currentUserSubject: BehaviorSubject<AuthUserDTO | null>;
  private currentUser!: Observable<AuthUserDTO | null>;


  constructor(private httpClient: HttpClient,
              private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<AuthUserDTO | null>(JSON.parse(sessionStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getCurrentUser(): AuthUserDTO | null {
    return this.currentUserSubject.value;
  }

  isLodged(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  login(usrName: string, password: string): Observable<any> {
    return this.httpClient.get(this.url, {
      headers: new HttpHeaders()
        .append('username', usrName)
        .append('password', password)
    }).pipe(map((user:any) => {
      this.currentUserSubject.next(user.data as AuthUserDTO);
      sessionStorage.setItem('currentUser', JSON.stringify(user.data));
      return user;
    }));
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
