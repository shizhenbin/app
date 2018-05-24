import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-tip',
  templateUrl: 'progress-tip.component.html'
})
export class ProgressTip {
  @Input() now:number = 0;
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
    console.log(this.now)
  }
}
