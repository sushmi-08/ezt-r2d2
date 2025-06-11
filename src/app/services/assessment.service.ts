import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AssessmentResponse {
  baseURL: string;
  consumer_id: string;
  ezt_eaid: string;
  name: string;
  wid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private eztEaidSubject = new BehaviorSubject<string>('');
  public eztEaid$ = this.eztEaidSubject.asObservable();

  private readonly BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4MjAyMDgxNTciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJoZWNsciIsImV4cCI6MTc0OTYyNzA1OCwianRpIjoiYTZmMDczODMtMjYyNy00ZDhhLWEzNGEtNmY0ZjIwYTc4MzY2IiwiaWF0IjoxNzQ5NjI2NzU4LCJpc3MiOiJodHRwczovL3Rva2VuLm1oZWR1Y2F0aW9uLmNvbSIsIm5iZiI6MTc0OTYyNjc1OCwic3ViIjoiOGUyZmY0NGItMDY2ZS00YThiLWFiYzMtMWEzNzJkZDY5ZWI5IiwidG9rZW5fdHlwZSI6ImJlYXJlciIsImV4cGlyZXNfaW4iOjMwMCwic2Vzc2lvbl90aW1lb3V0Ijo3ODAwLCJwZXJzb25feGlkIjoidXJuOmNvbS5taGVkdWNhdGlvbi5vcGVubGVhcm5pbmc6ZW50ZXJwcmlzZS5pZGVudGl0eTpwcm9kLnVzLWVhc3QtMTpwZXJzb246OGUyZmY0NGItMDY2ZS00YThiLWFiYzMtMWEzNzJkZDY5ZWI5IiwidXNlcl9uYW1lIjoiYS5leGNlbDQuMTAiLCJkZWZhdWx0X3JvbGUiOiJsZWFybmVyIiwic2Vzc2lvbl94aWQiOiJ1cm46Y29tLm1oZWR1Y2F0aW9uLm9wZW5sZWFybmluZzplbnRlcnByaXNlLmlkZW50aXR5OnByb2QudXMtZWFzdC0xOnNlc3Npb246OTAxMjJjNjctNTg1ZS00NmRjLWFkY2EtOTkyMDI4NTk4OTZlIiwic2Vzc2lvbl9pZCI6IjkwMTIyYzY3LTU4NWUtNDZkYy1hZGNhLTk5MjAyODU5ODk2ZSIsImNsaWVudF94aWQiOiJ1cm46Y29tLm1oZWR1Y2F0aW9uLm9wZW5sZWFybmluZzplbnRlcnByaXNlLmxvZ2luLmhlY2xyOnByb2QuZ2xvYmFsIiwiY2xpZW50X2lkIjoiaGVjbHIiLCJ4aWQiOiJ1cm46Y29tLm1oZWR1Y2F0aW9uLm9wZW5sZWFybmluZzplbnRlcnByaXNlLmlkZW50aXR5OnByb2QudXMtZWFzdC0xOnBlcnNvbjo4ZTJmZjQ0Yi0wNjZlLTRhOGItYWJjMy0xYTM3MmRkNjllYjkiLCJzY29wZSI6WyJhdXRoIl0sImF1dGhlbnRpY2F0aW9uX3R5cGUiOiJwYXNzd29yZCJ9.tvIeUvN8BnkKeESfnh2tKU1i52xLj7nHCMuYZHnomfWpx03m4fdmmBy3hBMFOmxCnfnl8hPiWASHP62ablmMqRqK4fBvAqPsoo5GcqMLCCqxLgnydzYozTz4gS-7LlBUJJS0efbbg8ruwHRy9qFCE0o8L9KP4iecHiEN6nVnnZWGWKSAf9m_4Wrw5XkAYIJrUom9dqc5ifkMod-_tNA-aNMBbXzIzN0-eBb2-IJgtBm52vGCaKlSVvwDILlBdxLv0oeK2fNA4rjw2ylnUQyqWNaLmRquAXWPJ3dXpF7H51DQJh0QWDti7E8cXYv0VEGUQctUFm39JWI7IkPs176cgw'
  private readonly REQUEST_BODY = {
    assignmentId: '406567146',
    isLateSubmissionAllowed: 'true',
    password: '',
    returnURL: '',
    role: 'student',
    sectionId: '146118820',
    studyAttempt: 'false',
    userId: '54330502',
  };

  constructor(private http: HttpClient) {}

  prepareAssessment(): Observable<unknown> {
    const url =
      'https://newconnect.mheducation.com/openapi/paam/student/prepareAssessmentForLaunch';
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.BEARER_TOKEN}`
    );

    console.log('▶️ Sending prepareAssessment request...');
    return this.http.post(url, this.REQUEST_BODY, { headers }).pipe(
      tap((response) => {
        console.log('Prepare Assessment Response:', response);
        const typedResponse = response as AssessmentResponse;
        if (typedResponse?.ezt_eaid) {
          this.setEztEaid(typedResponse.ezt_eaid);
        }
      }),
      catchError(this.handleError)
    );
  }

  getActivityInfo(eaid: string): Observable<unknown> {
    const timestamp = new Date().getTime();
    const url = `https://ezto.mheducation.com/api/caa/activity/info/${eaid}?_=${timestamp}`;

    console.log('📡 Fetching activity info for eaid:', eaid);
    return this.http.get(url).pipe(
      tap((response) => {
        console.log('📥 Activity Info Response:', response);
      }),
      catchError(this.handleError)
    );
  }

  setEztEaid(eaid: string): void {
    console.log('Setting EAID globally:', eaid);
    this.eztEaidSubject.next(eaid);
  }

  getEztEaid(): string {
    const eaid = this.eztEaidSubject.value;
    console.log('Getting EAID:', eaid);
    return eaid;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error ${error.status}: ${error.message}`;
    }
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
