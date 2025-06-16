import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conductance } from './conductance';

describe('Conductance', () => {
  let component: Conductance;
  let fixture: ComponentFixture<Conductance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conductance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conductance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
