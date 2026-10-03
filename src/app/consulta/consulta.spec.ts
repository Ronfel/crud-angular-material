import { ComponentFixture, TestBed } from '@angular/core/testing';
import { installMatchMediaMock } from '../../testing/match-media';
import { Consulta } from './consulta';

describe('Consulta', () => {
  let component: Consulta;
  let fixture: ComponentFixture<Consulta>;

  beforeEach(async () => {
    installMatchMediaMock();

    await TestBed.configureTestingModule({
      imports: [Consulta],
    }).compileComponents();

    fixture = TestBed.createComponent(Consulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
