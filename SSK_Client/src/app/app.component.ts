import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'app works!';
  browseItems: Array<string> = ['scenarios', 'steps', 'resources']
}
