import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AssessmentService } from '../../services/assessment.service';

export const entryPointGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const assessmentService = inject(AssessmentService);
  const eaid = route.paramMap.get('eaid');
  const locale = route.paramMap.get('locale');

  if (!eaid || !locale) {
    return router.createUrlTree(['/error']);
  }

  // Set the eaid globally
  assessmentService.setEztEaid(eaid);

  // Redirect to activity route
  return router.createUrlTree(['/activity']);
};
