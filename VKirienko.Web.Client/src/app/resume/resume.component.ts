import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FontAwesomeModule]
})
export class ResumeComponent {
}
