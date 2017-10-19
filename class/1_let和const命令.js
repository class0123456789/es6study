"use strict";//es5文件采用严格模式，es6不需要，自动开启
function test(){
  // for(let i=1;i<3;i++){
  //   console.log(i);
  // }
  // console.log(i);
  let a = 1;
  // let a = 2;
}

function last(){
  const PI=3.1415926;
  const k={
    a:1
  }
  k.b=3;//可以修改，是因为k存储的是一个对象，是存储的指针，对象指针不变，但内容可以更改
  console.log(PI,k);//所以可以正常输出
}


// test();
last();
