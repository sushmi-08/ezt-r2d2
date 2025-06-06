import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  questionId: string;

  constructor(private route: ActivatedRoute) {
    this.questionId = this.route.snapshot.paramMap.get('questionId') || '';
  }
}
