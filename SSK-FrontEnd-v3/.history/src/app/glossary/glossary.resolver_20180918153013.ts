import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class GlossaryResolver implements Resolve<any> {

  constructor() { }
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    const item = route.params.item;

    if (item) {
      console.log("dsfdsfsdf")
      return item;
    } else {
      console.log("dsfdsefseeeeeeeedf")
      this.changeDetectionEmitter.emit();
    }
  }
}
