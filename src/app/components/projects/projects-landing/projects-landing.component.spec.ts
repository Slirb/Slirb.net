import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLandingComponent } from './projects-landing.component';

describe('ProjectsLandingComponent', () => {
  let component: ProjectsLandingComponent;
  let fixture: ComponentFixture<ProjectsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
