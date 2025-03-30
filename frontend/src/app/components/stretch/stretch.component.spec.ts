import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StretchComponent } from './stretch.component';

describe('StretchComponent', () => {
  let component: StretchComponent;
  let fixture: ComponentFixture<StretchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StretchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StretchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
