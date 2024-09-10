import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferViewsComponent } from './defer-views.component';

describe('DeferViewsComponent', () => {
  let component: DeferViewsComponent;
  let fixture: ComponentFixture<DeferViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferViewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
