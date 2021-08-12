import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLoading = false;

  constructor(public appService: AppService) {
    // this.appService.load = true;
    this.loading();
  }

  ngOnInit() {

    this.appService.load = true;
  }

  loading(){
    
    this.appService.evtEvent.subscribe((val) => {
      this.isLoading = true;
      setTimeout(() => { this.isLoading = false; }, 1000);
    }, error => {
      setTimeout(() => { this.isLoading = false;}, 1000);
    });
  }
}
