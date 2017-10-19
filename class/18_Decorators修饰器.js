//必须安装decrorators
//npm install babel-plugin-transform-decrorators-legacy --save-dev
//在 .babelrc 中增加plugins
//{
//  "presets": ["es2015","stage-1"],
//  "plugins":["transform-decorators-legacy"]
//}
//改动后可重新启动服务
{
  /**
   * [description]
   * @param  {[type]} target      [要修改的类]
   * @param  {[type]} name        [类属性的名称]
   * @param  {[type]} descriptor [属性的描述对象]
   * @return {[type]}             [description]
   */
  let readonly=function(target,name,descriptor){
    descriptor.writable=false; //不能改写,只能读
    return descriptor
  };
  class Test{
    @readonly   //前面定的类修饰器
    time(){
      return '2017-03-11'
    }
  }

  let test = new Test();
  test.time=function(){
    console.log('reset time');
  };
  console.log(test.time());//由于对time进行了改写，所以会报错,如果去掉Test类的@readonly 就可以了

}

{
  let typename=function(target,name,descriptor){
    target.myname='hello'; //在类上增加一个静态属性
  }
  @typename
  class Test{

  }
  console.log('类修饰器',Test.myname);//输出 hello
}

//第三方的js修饰器库: core-decorators ;npm install core-decorators 然后引入就可以使用了,它已经实现了常规的修饰器
//@readonly  就可以使用了
{
   //使用 core-decorators实例
   let log=(type)=>{
     return function (target,name,descriptor) {
       let src_method=descriptor.value;
       descriptor.value=(...arg)=>{
         src_method.apply(target,arg);
         console.info(`log $(type)`);
       }
     }
   }

   class AD{
     @log('show')
     show(){
       console.log('ad is show');
     }
     @log('click')
     click(){
       console.log('ad is click');
     }
   }
   let ad=new AD();
   ad.show();
   ad.click();

   //执行结果如下： ad is show [src_method.apply(target,arg);]
   //执行结果如下： log show   [console.info(`log $(type)`);]
   //执行结果如下： ad is click [src_method.apply(target,arg);]
   //执行结果如下： log click   [console.info(`log $(type)`);]
}
