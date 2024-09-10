import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferOptionsComponent } from './defer-options.component';

describe('DeferOptionsComponent', () => {
  let component: DeferOptionsComponent;
  let fixture: ComponentFixture<DeferOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
