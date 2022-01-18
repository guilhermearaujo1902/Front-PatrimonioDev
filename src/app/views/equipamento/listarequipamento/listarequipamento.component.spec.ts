import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarequipamentoComponent } from './listarequipamento.component';

describe('ListarequipamentoComponent', () => {
  let component: ListarequipamentoComponent;
  let fixture: ComponentFixture<ListarequipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarequipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarequipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
