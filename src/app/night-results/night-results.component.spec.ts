import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightResultsComponent } from './night-results.component';

describe('NightResultsComponent', () => {
  let component: NightResultsComponent;
  let fixture: ComponentFixture<NightResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
