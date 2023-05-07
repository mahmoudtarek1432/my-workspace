import { TestBed } from '@angular/core/testing';

import { NgxProtoWebsocketService } from './ngx-proto-websocket.service';

describe('NgxProtoWebsocketService', () => {
  let service: NgxProtoWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxProtoWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
