import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QualtricsConfig {
  qualtrics?: {
    projectId?: string;
  };
}
