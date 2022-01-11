import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarpatrimonioComponent } from './listarpatrimonio.component';

describe('ListarpatrimonioComponent', () => {
  let component: ListarpatrimonioComponent;
  let fixture: ComponentFixture<ListarpatrimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarpatrimonioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarpatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
