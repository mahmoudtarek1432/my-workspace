import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxProtoWebsocketComponent } from './ngx-proto-websocket.component';

describe('NgxProtoWebsocketComponent', () => {
  let component: NgxProtoWebsocketComponent;
  let fixture: ComponentFixture<NgxProtoWebsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxProtoWebsocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxProtoWebsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
