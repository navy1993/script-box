import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Idea, User } from './app/model/idea';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public ideaList$: BehaviorSubject<Idea[]> = new BehaviorSubject<Idea[]>([]);
  
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(new User);

  constructor() { }

}
