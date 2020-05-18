import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Location } from '@angular/common';



@Injectable()
export class CanAuthenticationGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService, private location: Location) {
    super(router, keycloakAngular);
    console.log(this.keycloakAngular);
    console.log(this.router.url);
    /*if (this.router.url === '/'  || this.router.url.indexOf('vocabularies') > -1) {
      location.replaceState('/user');
    }*/
  }
  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return;
      }
      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        //this.router.navigateByUrl('/user');
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }
    });
  }
}
