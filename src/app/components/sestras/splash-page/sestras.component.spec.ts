import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SestrasComponent } from './sestras.component';

describe('SestrasComponent', () => {
  let component: SestrasComponent;
  let fixture: ComponentFixture<SestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SestrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
