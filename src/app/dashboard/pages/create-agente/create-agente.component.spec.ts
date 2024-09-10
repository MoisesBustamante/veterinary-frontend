import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgenteComponent } from '../../create-agente/create-agente.component';

describe('CreateAgenteComponent', () => {
  let component: CreateAgenteComponent;
  let fixture: ComponentFixture<CreateAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAgenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
