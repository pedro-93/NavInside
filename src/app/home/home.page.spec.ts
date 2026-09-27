import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    fixture =
      TestBed.createComponent(HomePage);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});