import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public size = 6;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/v1/users?page=1&count=' + this.size)
      .pipe(
        map(request => Object.values(request))
      )
      .pipe(
        map(request => Object.values(request[6]))
      );
  }

  setSize() {
    this.size += 6;
  }

}
