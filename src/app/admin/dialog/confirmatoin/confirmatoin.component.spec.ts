import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmatoinComponent } from './confirmatoin.component';

describe('ConfirmatoinComponent', () => {
  let component: ConfirmatoinComponent;
  let fixture: ComponentFixture<ConfirmatoinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmatoinComponent]
    });
    fixture = TestBed.createComponent(ConfirmatoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
