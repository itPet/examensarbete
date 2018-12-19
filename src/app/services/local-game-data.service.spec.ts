import { TestBed } from '@angular/core/testing';

import { LocalGameDataService } from './local-game-data.service';

describe('LocalGameDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalGameDataService = TestBed.get(LocalGameDataService);
    expect(service).toBeTruthy();
  });
});
