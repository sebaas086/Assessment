import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditContactComponent } from './create-edit-contact.component';

describe('CreateEditContactComponent', () => {
  let component: CreateEditContactComponent;
  let fixture: ComponentFixture<CreateEditContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditContactComponent]
    });
    fixture = TestBed.createComponent(CreateEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
