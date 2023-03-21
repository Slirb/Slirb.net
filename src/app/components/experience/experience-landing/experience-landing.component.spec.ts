import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceLandingComponent } from './experience-landing.component';

describe('ExperienceLandingComponent', () => {
  let component: ExperienceLandingComponent;
  let fixture: ComponentFixture<ExperienceLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
