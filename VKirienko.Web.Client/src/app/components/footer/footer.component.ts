import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    imports: [DatePipe]
})
export class FooterComponent {
  test : Date = new Date();
}
