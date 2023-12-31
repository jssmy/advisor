import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPageComponent } from './building-page.component';

describe('BuildingPageComponent', () => {
  let component: BuildingPageComponent;
  let fixture: ComponentFixture<BuildingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
