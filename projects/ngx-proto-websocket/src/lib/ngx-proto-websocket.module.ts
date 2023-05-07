import { Injector, NgModule } from '@angular/core';
import { NgxProtoWebsocketComponent } from './ngx-proto-websocket.component';
import { EndpointsSubjects } from '../helper/Subject/Endpoints-Subjects';
import { ProtoRootProvider } from '../helper/Protobuf/ProtoRootProvider';
import { ProtobufEndpointBuilder } from '../helper/Protobuf/ProtobufEndpointBuilder';
import { ProtobufWebsocket } from '../Endpoints/Implementation/ProtobufWebsocket';



@NgModule({
  declarations: [
    NgxProtoWebsocketComponent
  ],
  imports: [
  ],
  providers: [
    EndpointsSubjects,
    ProtoRootProvider,
    ProtobufEndpointBuilder,
    ProtobufWebsocket
  ],
  exports: [
    NgxProtoWebsocketComponent,
  ]
})
export class NgxProtoWebsocketModule { 

  static injectorInstance: Injector;
  //static injector instantiated for global use
  constructor(private DIinstance: Injector){
    
    NgxProtoWebsocketModule.injectorInstance = this.DIinstance;
    
  }
}
