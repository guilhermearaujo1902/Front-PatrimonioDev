import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarpermissaoComponent } from './listarpermissao.component';

describe('ListarpermissaoComponent', () => {
  let component: ListarpermissaoComponent;
  let fixture: ComponentFixture<ListarpermissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarpermissaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarpermissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
