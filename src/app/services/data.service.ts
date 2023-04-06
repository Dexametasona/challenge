import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { UserInterface } from 'src/interface/UserInterface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  usuario:UserInterface[]=[{dni:"",pass:"",nombre:""}];
  constructor(private firestore:Firestore) { }

  getUserData(usuario:UserInterface){
    const dataRef=collection(this.firestore, `user${usuario.dni}`)
    // const dataRef=collection(this.firestore, `user00503717`)
    return collectionData(dataRef, {idField:'id'})
  }
}
