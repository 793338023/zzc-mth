## 前言

虽然 react 一般都是 class 类的方式编写，但有时为了简单，就使用函数编写，但在以前这是无副作用的函数,所以很多事都无法去做，比如后期为了维护而不得不在函数里使用 state 等时，这就不会符合无副作用的函数了，所以 react 会报错，而这是使用 hooks 就可以拯救啦，当然也有喜欢使用函数式编写的人来说也是福音，因为 hooks 基本上支持所有 react 生命周期，state,redux 等等，与编写 class 方式差不多等效了。

## State

引入 react 里的 useState。
useState 的参数就像 state 初始化值。
useState 返回的值一个数组，数组中第一个参数是以前的 state,第二个参数是 setState，由于是参数，所以可以自己命名，不用想以前就 state,setState 这样。

例子如下:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';

export const getText = function(props){
    const [test, setTest] = useState('');
    function onChange(val){
        setTest(val);
    }

    return (
        <div>
            <List>
               <InputItem value={test} onChange={onChange}>hooks测试</InputItem>
            </List>
            <List>
               <div>{test}</div>
            </List>
        </div>
    );
}
```

## Effect

引入 react 里的 Effect。
useEffect 增加了从功能组件执行副作用的功能，其实这个钩子就是让函数支持 react 生命周期。
它的目的是作为 componentDidMount，componentDidUpdate 以及 componentWillUnmount，只是都在这个 useEffect 钩子实现。

1. useEffect 的第二参数为空数组[],效果如 componentDidMount:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';


export const getText = function(props){

    // 调用父级组件函数更新state
    useEffect(()=>{
        props.setVal(Math.floor(Math.random()*100));
    },[]);

    return (
        <div>
            <List>
               <div>{props.value}</div>
            </List>
        </div>
    );
}
```

2. useEffect 的第二参数不传，效果如 componentDidUpdate,但初始加载也会触发:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';


export const getText = function(props){

    // 调用父级组件函数更新state
    useEffect(()=>{
        props.setVal(Math.floor(Math.random()*100));
    });

    return (
        <div>
            <List>
               <div>{props.value}</div>
            </List>
        </div>
    );
}
```

3. useEffect 里函数的返回值，效果如 componentWillUnmount,在组件卸载调用:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';


export const getText = function(props){
    const timer = setInterval(()=>{
        console.log(+new Date());
    });
    // 调用父级组件函数更新state
    useEffect(()=>{
        props.setVal(Math.floor(Math.random()*100));
        return ()=>{
            clearInterVal(timer);
        }
    });

    return (
        <div>
            <List>
               <div>{props.value}</div>
            </List>
        </div>
    );
}
```

4. useEffect 的第二参数数组有对应的 state 或 props 值，只要当前值更新了才触发:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';


export const getText = function(props){

    // 调用父级组件函数更新state
    useEffect(()=>{
        props.setVal(Math.floor(Math.random()*100));
    },[props.value]);

    return (
        <div>
            <List>
               <div>{props.value}</div>
            </List>
        </div>
    );
}
```

## 自定义钩子

就是抽取相同逻辑的部分封装成一个新的钩子，而钩子使用 hooks 的钩子封装实现，然后返回一个目标内容，如值。

自定义钩子:

```
import React, { Component, useState, useEffect } from 'react';
export const getHook = function(vId,props){
    const [ssId, setSsId] = useState('');
    useEffect(()=>{
        props.setVal(Math.floor(Math.random()*100));
        setSsId(vId);
    },[props.value]);

    return ssId;
}
```

使用自定义钩子:

```
import React, { Component, useState, useEffect } from 'react';
import { InputItem, List } from 'antd-mobile';
improt {getHook} from './hooks';

export const getText = function(props){
    const nVal = getHook("xx",props);

    return (
        <div>
            <List>
               <div>{props.value}</div>
            </List>
        </div>
    );
}
```

## 使用规则

1. 只能在顶层调用 Hooks。不要在循环，条件或嵌套函数中调用 Hook。
2. 只能在 functional component 中使用，所以如果在 class 使用一定要是组件的形式，而不是函数调用的方式，不是会当成一个在 class 里使用 hooks。

## 参考

react 官网有很详细的资料,而且以上的只是当用的，Hooks 还提供了别的钩子。
[react 官方 Hooks](https://reactjs.org/docs/hooks-custom.html)
