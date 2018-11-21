import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderAuthService {

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>('/api/v1/users/1')
      .pipe(
        map(request => Object.values(request))
      )
      .pipe(
        map(request => Object.values(request[1]))
      );
  }
}
