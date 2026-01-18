
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog-service';

describe('CatalogService', () => {
  let component: CatalogService;
  let fixture: ComponentFixture<CatalogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
