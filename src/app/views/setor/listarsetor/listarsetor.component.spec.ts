import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarsetorComponent } from './listarsetor.component';

describe('ListarsetorComponent', () => {
  let component: ListarsetorComponent;
  let fixture: ComponentFixture<ListarsetorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarsetorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarsetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
