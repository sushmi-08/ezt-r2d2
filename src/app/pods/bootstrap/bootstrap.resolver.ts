import { catchError, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import {
	AssessmentResponse,
	AssessmentService,
} from '../../services/assessment.service';

export const bootstrapResolver: ResolveFn<boolean> = () => {
  const assessmentService = inject(AssessmentService);

  return assessmentService.prepareAssessment().pipe(
    tap((response) => {
      console.log('Bootstrap Response:', response);
    }),
    map((response) => {
      const typedResponse = response as AssessmentResponse;
      // Only return true if ezt_eaid exists
      return !!typedResponse?.ezt_eaid;
    }),
    catchError((error) => {
      console.error('Bootstrap Error:', error);
      return of(false);
    }),
  );
};
