import { Routes } from '@angular/router';

import { ActivityCompletedComponent } from './pods/activity/activity-completed/activity-completed.component';
import { ActivitySaveExitComponent } from './pods/activity/activity-save-exit/activity-save-exit.component';
import { ActivitySpinnerComponent } from './pods/activity/activity-spinner/activity-spinner.component';
import { ActivityComponent } from './pods/activity/activity.component';
import { IntroComponent } from './pods/activity/intro/intro.component';
// import { bootstrapGuard } from './pods/bootstrap/bootstrap.guard';
// import { entryPointGuard } from './pods/entry-point/entry-point.guard';
import { ErrorComponent } from './pods/error/error.component';
import { QuestionNavigationComponent } from './pods/question-navigation/question-navigation.component';

export const routes: Routes = [
  // {
  //   path: 'bootstrap/:id',
  //   canActivate: [bootstrapGuard],
  // },
  // {
  //   path: 'lang/:locale/eaid/:eaid',
  //   canActivate: [entryPointGuard],
  // },
  {
    path: 'activity',
    component: ActivityComponent,
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
