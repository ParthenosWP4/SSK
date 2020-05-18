import { Injectable, QueryList, ElementRef } from '@angular/core';

@Injectable()

export class DataContributionService {

  actvity_name             = { name: ''};
  standardSelectedTagArray = [];

  constructor() { }

    public methodCall2( actName ): { name: string } {
        this.actvity_name.name = actName;
        return this.actvity_name;
    }

}
