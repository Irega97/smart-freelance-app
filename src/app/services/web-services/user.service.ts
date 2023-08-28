import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
// import { Token } from 'src/app/models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: User;

  ruta = environment.apiURL + "/user/"

  constructor(private http: HttpClient/*, private events: EventsService */) { }

  createUser(body: User): Observable<any>{
    return this.http.post<JSON>(this.ruta + "new", body);
  }

  getUserByWallet(walletAddress: string | null): Observable<any>{
    return this.http.get<JSON>(this.ruta + walletAddress);
  }
}
