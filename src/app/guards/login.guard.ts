import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(private data:DataService, private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.data.usuario[0].dni=="" && this.data.usuario[0].pass==""){
      this.route.navigate(['/login'])
      return false
    }
    else{
      return true
    }
  }

}
