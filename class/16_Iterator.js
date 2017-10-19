//什么是Iterator接口,主要是实现统一的接口用法
//Iterator接口用法
//for ... of,就是不断调用Iterator接口,但其实对象内部的实现是不一样的
{
  let arr=['hello','world'];
  let map=arr[Symbol.iterator]();//数组内部已经实现了这个Symbol.iterator接口,()表示执行，返回了一个map对象
  //map 对象有 next()方法
  console.log(map.next()); // 返回值:{value:"hello",done:false} false 表示循环还没有结束
  console.log(map.next()); // 返回值:{value:"hello",done:false} false 表示循环还没有结束
  console.log(map.next()); // 返回值:{value:undefined,done:true} true 表示循环结束

}
{
  //OBJECT,自已实现Iterator接口
  let obj = {
    start:[1,3,2],
    end:[7,9,8],
    //声明Iterator接口
    [Symbol.iterator](){
      let self = this;
      let index=0;
      let arr=self.start.concat(self.end);//合并数组
      return {
        //Iterator接口必须要有next这个方法
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false //false 表示循环还没有结束
            }
          }else{ // 返回值:{done:true} true 表示循环结束
            value:arr[index++],
            done:true
          }
        }
      }
    }

  }
  //先遍历
  for(let key of obj){
    console.log(key)
  }
  //执行结果如下:
  //1 3 2 7 9 8
}
{
  //for ... of,
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value)
  }
  //执行结果如下:
  //value hello
  //value world
}
