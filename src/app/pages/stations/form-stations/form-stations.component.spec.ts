import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStationsComponent } from './form-stations.component';

describe('FormStationsComponent', () => {
  let component: FormStationsComponent;
  let fixture: ComponentFixture<FormStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
