import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { HomeService } from './../../../service/home/home.service';
import { NakedStepTwo } from './step-two';

@Component({
  selector: 'naked-step-one',
  templateUrl: 'step-one.html'
})
export class NakedStepOne {

  select: number;
  types = [
    {title: '形状',data: [
        {name: '圆形', value: 0},
        {name: '心形', value: 1},
        {name: '枕行', value: 2},
        {name: '梨形', value: 3},
        {name: '公主形', value: 4},
      ]
    },
    {title: '砖重',data: [
        {name: '0.30ct以下', value: 0},
        {name: '0.30-0.49ct', value: 1},
        {name: '0.50-0.99ct', value: 2},
        {name: '1.0-1.99ct', value: 3},
        {name: '2.0ct以上', value: 4}
      ]
    },
    {title: '颜色',data: [
        {name: 'D', value: 0},
        {name: 'E', value: 1},
        {name: 'F', value: 2},
        {name: 'G', value: 3},
        {name: 'H', value: 4},
        {name: 'I', value: 5},
        {name: 'J', value: 6},
      ]
    },
    {title: '净度',data: [
        {name: 'RL', value: 0},
        {name: 'IF', value: 1},
        {name: 'VVS1', value: 2},
        {name: 'VVS2', value: 3},
        {name: 'VS1', value: 4},
        {name: 'VS2', value: 5}
      ]
    }
  ];
  types2 = [
    {title: '荧光',data: [
        {name: '有', value: 0},
        {name: '无', value: 1}
      ]},
    {title: '抛光',data: [
        {name: 'EX', value: 0},
        {name: 'VG', value: 1},
        {name: 'GD', value: 2},
      ]},
    {title: '对称',data: [
        {name: 'EX', value: 0},
        {name: 'VG', value: 1},
        {name: 'GD', value: 2},
      ]},
    {title: '切工',data: [
        {name: 'EX', value: 0},
        {name: 'VG', value: 1},
        {name: 'GD', value: 2},
      ]}
    ];
  dataList = [
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1}
  ];
  step:number = 3;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public homeService: HomeService) {

  }

  ngOnInit(){
  }

  doChoose(type:{name:string,value:any,choose:boolean}){
    type.choose = !type.choose;
  }

  doSelect(index:number){
   this.select = index;
  }

  reset(){
    this.types.map((item)=>{
      item.data.map((type:any)=>{
        type.choose = false;
      })
    });
    this.types2.map((item)=>{
      item.data.map((type:any)=>{
        type.choose = false;
      })
    });
  }

  pop(){
    this.navCtrl.pop();
  }

  next(){
    this.events.publish('goto',NakedStepTwo);
  }
}
