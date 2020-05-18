import { Directive, EventEmitter, ElementRef, HostListener, Output,  } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: "span.tag",
})
export class TagDirectiveDirective {

  constructor(private elementRef: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    const type = this.elementRef.nativeElement.getAttribute('class').split(' ')[4];
    this.router.navigate(['vocabularies', (type === 'standard' || type === 'object' || type === 'technique' ||
        type === 'discipline') ? type + 's' : 'activities', encodeURI(this.elementRef.nativeElement.innerText) ]);
  }

}