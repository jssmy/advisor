import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputFallbackComponent } from './search-input-fallback.component';

describe('SearchInputFallbackComponent', () => {
  let component: SearchInputFallbackComponent;
  let fixture: ComponentFixture<SearchInputFallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputFallbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputFallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
