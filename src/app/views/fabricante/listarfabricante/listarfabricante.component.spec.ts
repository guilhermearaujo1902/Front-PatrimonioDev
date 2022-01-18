import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarfabricanteComponent } from './listarFabricante.component';

describe('ListarfabricanteComponent', () => {
  let component: ListarfabricanteComponent;
  let fixture: ComponentFixture<ListarfabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarfabricanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
