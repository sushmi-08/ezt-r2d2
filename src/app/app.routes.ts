import { Routes } from '@angular/router';

import { ActivityCompletedComponent } from './pods/activity/activity-completed/activity-completed.component';
import { ActivitySaveExitComponent } from './pods/activity/activity-save-exit/activity-save-exit.component';
import { ActivitySpinnerComponent } from './pods/activity/activity-spinner/activity-spinner.component';
import { ActivityComponent } from './pods/activity/activity.component';
import { IntroComponent } from './pods/activity/intro/intro.component';
import { bootstrapResolver } from './pods/bootstrap/bootstrap.resolver';
import { ErrorComponent } from './pods/error/error.component';
import { QuestionGroupComponent } from './pods/question-group/question-group.component';
import { QuestionComponent } from './pods/question-group/question/question.component';
import { QuestionNavigationComponent } from './pods/question-navigation/question-navigation.component';

export const routes: Routes = [
  {
    path: 'activity',
    component: ActivityComponent,
    resolve: {
      bootstrap: bootstrapResolver,
    },
    children: [
      {
        path: 'intro',
        component: IntroComponent,
      },
      {
        path: 'activity-save-exit',
        component: ActivitySaveExitComponent,
      },
      {
        path: 'activity-spinner',
        component: ActivitySpinnerComponent,
      },
      {
        path: 'activity-completed',
        component: ActivityCompletedComponent,
      },
      {
        path: ':questionGroupId',
        component: QuestionGroupComponent,
        children: [
          {
            path: ':questionId',
            component: QuestionComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'question-navigation',
    component: QuestionNavigationComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'activity',
  },
];
