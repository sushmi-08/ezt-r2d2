import { filter, take } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-activity',
  imports: [RouterOutlet],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  standalone: true,
})
export class ActivityComponent implements OnInit {
  constructor(private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    this.assessmentService.eztEaid$
      .pipe(
        filter((eaid) => !!eaid), // wait until non-empty value is emitted
        take(1),
      )
      .subscribe({
        next: (eaid) => {
          this.assessmentService.getActivityInfo(eaid).subscribe({
            next: (response) => {
              console.log('Activity Info Response:', response);
            },
            error: (error) => {
              console.error('Error fetching activity info:', error);
            },
          });
        },
      });
  }
}
