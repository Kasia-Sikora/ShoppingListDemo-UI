import {inject, TestBed} from '@angular/core/testing';

import { RecipeDetailGuard } from './recipe-detail.guard';

describe('RecipeDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeDetailGuard]
    });
    // guard = TestBed.inject(RecipeDetailGuard);
  });

  it('should be created', inject([RecipeDetailGuard], (guard: RecipeDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
