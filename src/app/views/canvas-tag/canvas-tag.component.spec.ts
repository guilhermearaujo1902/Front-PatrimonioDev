import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTagComponent } from './canvas-tag.component';

describe('CanvasTagComponent', () => {
  let component: CanvasTagComponent;
  let fixture: ComponentFixture<CanvasTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
