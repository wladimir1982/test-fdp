import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position, User} from '../interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  getPosition(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/v1/positions')
      .pipe(
        map(request => Object.values(request))
      )
      .pipe(
        map(request => Object.values(request[1]))
      );
  }

  getToken() {
    return this.http.get('/api/v1/token')
      .pipe(
        map(request => Object.values(request))
      )
      .pipe(
        map(request => request[1])
      );
  }

  register(newUser: User): Observable<User> {
    const fd = new FormData();
    fd.append('name', newUser.name);
    fd.append('email', newUser.email);
    fd.append('phone', newUser.phone);
    fd.append('position_id', newUser.position_id);
    fd.append('photo', newUser.photo, newUser.photo.name);
    const httpOptions = {
      headers: new HttpHeaders({
        token: `${localStorage.getItem('auth-token')}`
      })
    };
    return this.http.post<User>('/api/v1/users', fd, httpOptions);
  }
}
