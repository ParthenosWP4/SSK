import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class GlossaryResolver implements Resolve<any> {

  constructor() { }
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  public resolve(route: ActivatedRouteSnapshot): Promise<any> {
    const type = route.params.type;
    if (type !== undefined) {
      return type;
    } else {
      this.changeDetectionEmitter.emit();
    }
  }
}
