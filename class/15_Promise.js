//Promise 是异步编程的一种解决方案
//Promise 的作用
//Promise用法 ,A 执行完 再执行B
{
  //基本定义
  //传统的回调es5
  let ajax = function(callback){
    console.log('执行');
    setTimeout(function() {
      callback&&callback.call();
    },1000);
  };
  //执行
  ajax(function(){
    console.log('timeout1');
  })
  //执行结果:
  //1   执行  console.log('执行');
  //2   timeout1   console.log('timeout1');
}


{
  //Promise
  let ajax = function(){
    console.log('执行2');
    //resolve 执行下一步的操作，reject要中断当前的操作
    return new Promise(function(resolve,reject){
       setTimeout(function(){
         resolve();
       },1000)
    });

  };
  //执行 then的第一个函数就是下一步resolve，如果有第二个参数就是reject
  ajax().then(function(){
    console.log('promise2','timeout2');
  })；
  //执行结果:
  //1   执行2 console.log('执行2');
  //2   timeout2 console.log('promise2','timeout2');
  //执行 then的第一个函数就是下一步resolve，如果有第二个参数就是reject
// ajax().then(function(){
//    console.log('promise2','timeout2');
//  },function(){
//    console.log('promise3','timeout3');
//  })；

}
{
  let ajax = function(){
    console.log('执行3');
    //resolve 执行下一步的操作，reject要中断当前的操作
    return new Promise(function(resolve,reject){
       setTimeout(function(){
         resolve();
       },1000);
    });

  };

  //执行 then的第一个函数就是下一步resolve，如果有第二个参数就是reject
  ajax().then(function(){
    return new Promise(function(resolve,reject){
       setTimeout(function(){
         resolve();
       },2000);
   })；
 }).then(function(){
   console.log('timeout3');
 });
 //执行结果:
 //1   console.log('执行3');
 //2   console.log('timeout3');

}
{

  let ajax=function(num){
    console.log('执行4');
    //resolve 执行下一步的操作，reject要中断当前的操作
    return new Promise(function(resolve,reject){
       if(num>5){
         resolve();
       }else{
         throw new Error('出错了')
       }
    });
  }
  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){
    console.log('catch',err);
  });
  //出错了
  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){
    console.log('catch',err);
  });
}
{
  //Promise.all 全部都完成后 才做其它的
  //如所有的图片加载完后增加到页面
  function loadImg(src) {
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(err) {
        reject(err);
      }
    });

  }

  function showImgs(imgs) {
    imgs.forEach(function(img){
      document.body.appendChild(img);
    });
  }

  Promise.all([
    loadImg('http://i4.buimg.com/1.png');
    loadImg('http://i4.buimg.com/2.png');
    loadImg('http://i4.buimg.com/3.png');
  ]).then(showImgs);
}

{
  //Promise.race 有一个任务完成后 做其它的
  //只要有一张图片加载完后，就增加到页面,
  function loadImg(src) {
    return new Promise((resolve,reject)=>{
      let img=document.createElement('img');
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(err) {
        reject(err);
      }
    });

  }

  function showImgs(imgs) {

      let p=document.createElement('p');
      p.appendChild(img);
      document.body.appendChild(p);

  }

  Promise.race([
    loadImg('http://i4.buimg.com/1.png');
    loadImg('http://i4.buimg.com/2.png');
    loadImg('http://i4.buimg.com/3.png');
  ]).then(showImgs);
}
