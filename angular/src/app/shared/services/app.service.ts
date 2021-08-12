import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  public evtEvent: EventEmitter<boolean> = new EventEmitter();

  public set load(event: boolean){
    this.evtEvent.emit(event); // now correct this
  }  
}
