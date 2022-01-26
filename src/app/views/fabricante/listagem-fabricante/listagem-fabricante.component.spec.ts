import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemfabricanteComponent } from './listagem-fabricante.component';

describe('ListarfabricanteComponent', () => {
  let component: ListagemfabricanteComponent;
  let fixture: ComponentFixture<ListagemfabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemfabricanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
