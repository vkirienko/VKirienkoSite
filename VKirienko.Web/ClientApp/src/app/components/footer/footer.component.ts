import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    imports: [DatePipe]
})
export class FooterComponent {
  test : Date = new Date();
}
