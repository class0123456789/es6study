//ES6 模块化 已经标准化
//ES6 用import 导入
//ES6 用expport 导出
//如有以下文件 ep.js
 export let A=123;

 export function test(){
   console.log('test');
 }

 export class Hello{
   test(){
     console.log('class');
   }
 }

 //1在使的文件 ep1.js中使用import 导入
 // import {A,test,Hello} from 'ep.js'
 // import * as lesson from 'ep.js' //全部导入到lesson,使用 lesson.A,lesson.Hello

 //如有以下文件 epp.js

 let B=123;
 let testt=function testt(){
   console.log('testt');
 }
 class Helloo{
   test(){
     console.log('Helloo');
   }
 }

 export default {
   B,
   testt,
   Helloo
 }

 //2在使的文件 epp.js中使用import 导入
 //全部导入  import lessepp from 'epp.js'
  //全部导入到lessepp,使用 lessepp.B,lessepp.testt,lessepp.Helloo
