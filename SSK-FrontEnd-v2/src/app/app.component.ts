import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  browseItems: Array<string> = ['scenarios', 'steps', 'resources'];
  footerText = 'PARTHENOS is a Horizon 2020 project funded by the European Commission. The views and opinions expressed in this publication are the sole responsibility of the author and do not necessarily reflect the views of the European Commission.'
  endOfPageText = 'Except where otherwise noted, content on this site is licensed under a Creative Commons Attribution 4.0 International license CC BY-NC 4.0'
}
