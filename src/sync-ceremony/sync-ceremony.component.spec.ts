import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncCeremonyComponent } from './sync-ceremony.component';

describe('SyncCeremonyComponent', () => {
  let component: SyncCeremonyComponent;
  let fixture: ComponentFixture<SyncCeremonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncCeremonyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyncCeremonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
