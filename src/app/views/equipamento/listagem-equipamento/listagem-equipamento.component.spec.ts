import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemequipamentoComponent } from './listagem-equipamento.component';

describe('ListarequipamentoComponent', () => {
  let component: ListagemequipamentoComponent;
  let fixture: ComponentFixture<ListagemequipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemequipamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemequipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

