import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropietarioComponent } from './update-propietario.component';

describe('UpdatePropietarioComponent', () => {
  let component: UpdatePropietarioComponent;
  let fixture: ComponentFixture<UpdatePropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePropietarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
