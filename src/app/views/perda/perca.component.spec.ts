import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercaComponent } from './perca.component';

describe('PercaComponent', () => {
  let component: PercaComponent;
  let fixture: ComponentFixture<PercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
