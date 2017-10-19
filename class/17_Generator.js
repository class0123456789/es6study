// Generator 是异部编程的一种解决方案(如使用回调函数，Promise)
// Generator 比Promise更高级一些,Promise不断的点then
// Generator 里面它包函多个步骤 ,遇到 yield或return就停止了
// next 函数的用法
// yield* 的语法
{
  //Generator其本定义
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c';
  };
  let k=tell();
  console.log(k.next()); //执行第1个yield, value输出 a ,停止了, done:false 表示后面有操作，还没有结束程序，等待指定继续运行
  console.log(k.next()); //执行第2个yield,  value输出 b ,停止了  done:false 表示后面有操作，还没有结束程序，等待指定继续运行
  console.log(k.next()); //执行第3个yield,  value输出 c ,停止了  done:true 表示已完成程序所有指令了，
  console.log(k.next()); //执行第4个yield,  由于没有第4个yield,所以value输出 undefined ,停止了  done:true 表示没有指令了，
}
//Generator接口就是一个函数遍历器，所以它也可以作为遍历器
{
   let obj={};
   obj[Symbol.iterator]=function* (){
     yield 1;
     yield 2;
     yield 3;
     yield 4;
   }
   for(let value of obj){//会输出1,2,3,4
     console.log('value',value);
   }
}
//Generator最大的优点，就是作为状态机
{
  let state=function* (){
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status = state();
   console.log(status .next()); //A
   console.log(status .next()); //B
   console.log(status .next()); //C
   console.log(status .next()); //A
   console.log(status .next()); //B
}
//Generator语法的另一种asyn 与await,与使用yield是一样的，只是一种语法糖
{
  let state=asyn function (){
    while(1){
      await 'A';
      await 'B';
      await 'C';
    }
  }
  let status = state();
   console.log(status .next()); //A
   console.log(status .next()); //B
   console.log(status .next()); //C
   console.log(status .next()); //A
   console.log(status .next()); //B
}
{
  //抽奖业务逻辑
  let draw =function(count){
    //具体抽奖逻辑
    console.info(`剩余$(count)次`);
  }
  let residue=function* (count){
    while (count>0) {
      count--;
      yield draw(count);
    }
  }
  let star=residue(10);
  let btn = document.createElement('button');
  btn.id='start';
  btn.textContent='抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventlistener('click',function(){
    start.next();
  },false);
}

{
  //长轮询,模拟ajax
  let ajax = function*(){
    yield new Promise(function(resolve,reject){
      setTimeOut(function(){
        resole({code:0});//resole({code:1})
      },200);
    })
  }
  let pull = function(){
    let generator=ajax();
    let step=generator.next();//返回Promise实例
    //value就是Promise实例
    setp.value.then(function(d) {
      if(d.code!=0){
        setTimeOut(function () {
            console.log('wait');
            pull();
        },1000);

      }else{
        console.info(d);
      }
    });
  }
  pull();

}
