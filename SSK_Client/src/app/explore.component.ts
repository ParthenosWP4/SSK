
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'explore',
    template: `<ul class="dropdown-menu" >
                     <li *ngFor=" let item of browseItems"><a [routerLink]="'/'+item">{{item}}</a></li>
                </ul>`
})

export class ExploreComponent {
    @Input() displayed: any;
    browseItems: Array<string> = ['scenarios', 'steps', 'resources']


    constructor() {
    }
}
