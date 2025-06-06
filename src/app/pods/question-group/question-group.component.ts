import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-question-group',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './question-group.component.html',
  styleUrls: ['./question-group.component.scss'],
})
export class QuestionGroupComponent {
  questionGroupId: string;

  constructor(private route: ActivatedRoute) {
    this.questionGroupId =
      this.route.snapshot.paramMap.get('questionGroupId') || '';
  }
}
