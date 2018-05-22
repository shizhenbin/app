/*
 *     // pipe模块统一管理
 * */
import {Pipe, Injectable, PipeTransform} from '@angular/core';
@Pipe({
  name: 'replace'
})
@Injectable()
export class ReplacePipe implements PipeTransform {
  constructor(){}
  transform(val: string):any {
    return 'pipe use like this';
  }
}
