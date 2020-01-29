// auth guard used to prevent unauthenticated userd from accessing restricted routes
// by implementing CanActivate method
// use the auth services to check if the user is logged in 
// used in routing file to protect the page with access control

import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@app/_services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

   constructor(
       private router: Router,
       private authService: AuthService
   ){ }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       const currentUser = this.authService.currentUserValue;
       if(currentUser) {
           // logged in return true
           return true;
       } 
       // not logged in the redirect to login page with the return url
       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
       return false;
   } 
}