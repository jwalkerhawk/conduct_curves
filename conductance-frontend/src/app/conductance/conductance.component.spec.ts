import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductanceComponent  } from './conductance.component';

describe('Conductance', () => {
  let component: ConductanceComponent ;
  let fixture: ComponentFixture<ConductanceComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConductanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductanceComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
