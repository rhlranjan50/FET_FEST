import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonationEventsComponent } from './blood-donation-events.component';

describe('BloodDonationEventsComponent', () => {
  let component: BloodDonationEventsComponent;
  let fixture: ComponentFixture<BloodDonationEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodDonationEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodDonationEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
