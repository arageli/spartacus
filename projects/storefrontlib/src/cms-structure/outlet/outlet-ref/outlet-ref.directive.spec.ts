import { Component, TemplateRef, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntersectionOptions } from 'projects/storefrontlib/src/layout/intersection/intersection.model';
import { IntersectionService } from 'projects/storefrontlib/src/layout/intersection/intersection.service';
import { of } from 'rxjs';
import { OutletDirective } from '../outlet.directive';
import { OutletService } from '../outlet.service';
import { OutletRefDirective } from './outlet-ref.directive';

const OUTLET_NAME = 'PDP.images';
const STANDARD_TEXT = 'standard';
const CUSTOM_TEXT = 'customized';

@Component({
  template: `
    <ng-template cxOutletRef="${OUTLET_NAME}">
      <div id="debugEl">${CUSTOM_TEXT}</div>
    </ng-template>
    <ng-container *cxOutlet="'${OUTLET_NAME}'">
      <div id="debugEl">${STANDARD_TEXT}</div>
    </ng-container>
  `,
})
class TestContainerComponent {}

class MockIntersectionService {
  isIntersected(_element: HTMLElement, _options?: IntersectionOptions) {
    return of(true);
  }
}

describe('OutletDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let service: OutletService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestContainerComponent,
        OutletDirective,
        OutletRefDirective,
      ],
      providers: [
        OutletService,
        { provide: IntersectionService, useClass: MockIntersectionService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
    service = TestBed.get(OutletService as Type<OutletService>);
  });

  it('should render custom content', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#debugEl').textContent).toContain(
      CUSTOM_TEXT
    );
  });

  it('should have outlet for given name', () => {
    fixture.detectChanges();
    expect(service.get(OUTLET_NAME) instanceof TemplateRef).toBeTruthy();
  });
});
