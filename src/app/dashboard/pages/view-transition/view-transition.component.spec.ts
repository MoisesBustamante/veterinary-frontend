import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransitionComponent } from './view-transition.component';

describe('ViewTransitionComponent', () => {
  let component: ViewTransitionComponent;
  let fixture: ComponentFixture<ViewTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTransitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
