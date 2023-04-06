import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/interface/UserInterface';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private firestore:Firestore) { }

  getUsers(){
    const dataRef=collection(this.firestore,"listUser")
    return collectionData(dataRef,{idField:'id'}) as Observable<UserInterface[]>
  }


}
