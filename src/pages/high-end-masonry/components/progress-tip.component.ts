import { Component } from '@angular/core';

@Component({
  selector: 'progress-tip',
  templateUrl: 'progress-tip.component.html'
})
export class ProgressTip {

  progress = [
    { index: 0},
    { index: 1},
    { index: 2},
    { index: 3},
    { index: 4},
    { index: 5},
    { index: 6}
  ];
  constructor() {

  }

  ngOnInit(){
  }
}
