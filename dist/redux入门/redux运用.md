## redux 的概念

Redux 是 Flux 的另一种实现，也可以说进步，在以前基本都是使用 MVC 开发模式，然而这个模式没有限制住广大开发者们，因为他只是一个开发模式，没有边界限制，只能自己按照 MVC 的开发模式规范去做，至于是否真的按照规范做，这就不能约束了，所以会出现 M 与 V 直接对话，而没有让 C 起到作用，或者一些别的，使得 MVC 模式下开发混乱，还有就是 Model 和 View 之间缠绕着蜘蛛网一样复杂的依赖关系，让人难以维护。
而 Redux 出现可以说把这个模式加上了约束条件，不让开发者为了方便跳过 C 等操作，一定遵循 Action->Dispatcher->Store->view->Action，这个流程循环执行。

Dispatcher:处理动作分发，维持 Store 之间的依赖关系；
Store:负责存储数据和处理数据相关逻辑；
Action:驱动 Dispatcher 的 JavaScript 对象；
View:视图部分，负责显示用户界面。

如果把 redux 和 MVC 做一个结构对比，那么，redux 的 Dispatcher 相当于 MVC 的 Controller,redux 的 Store 相当于 MVC 的 Model,redux 的 View 是 react 组件 对应 MVC 的 View 了，至于多出来的这个 Action，可以理解为对应给 MVC 框架的用户请求。

### Redux 的基本原则

```bash
1、唯一数据源
2、保持状态只读
3、数据改变只能通过纯函数完成

```

#### 唯一数据源

唯一数据源指的是应用的状态数据应该只存储在唯一的一个 Store 上。
虽然我们经常会按功能把 store 分成多个文件进行管理，但最后我们还是会把 store 合并成一个 Store。

#### 保持状态只读

保持状态只读，就是说不能去直接修改状态，要修改 Store 的状态，必须要通过派发一个 action 对象完成。

#### 数据改变只能通过纯函数完成

这里所说的纯函数就是 Reducer，reducer(state , action)
第一个参数 state 是当前的状态，第二个参数 action 是接收到的 action 对象，而 reducer 函数要做的事情，就是根据 state 和 action 的值产生一个新的对象返回，注意 reducer 必须是纯函数，也就是说函数的返回结果必须完全由参数 state 和 action 决定，而且不产生任何副作用，也不能修改参数 state 和 action 对象。

## react-redux

由于 redux 可以通用其他的地方，所以它的灵活性高，使用中间件连接 react 与 redux,免除一些配置，如 react-redux 最主要的两个功能是 connect 与 Provider。

### connect

connect 有两个参数 mapStateToProps、mapDispatchToProps，就是把 redux 的 Store 变成组件的 props 与把 action 方法变成组件的 props，方便组件内部调用。
connect 的实现就是给组件嵌套一层容器组件，然后让容器组件向内部的组件传递 props，既容器组件与傻瓜组件的概念。

mapStateToProps、mapDispatchToProps 函数都接受两个参数，第二参数都是为自身拥有的 props，mapStateToProps 第一个参数为 Store，返回的对象为转化为 props 的值，mapDispatchToProps 第一参数为 dispatch 派发器，既 action 怎么触发派发函数，而 mapDispatchToProps 可以直接为一个字面量对象，那么就可以把 action 包装为一个派发函数，只要触发它即可。

```bash
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {setItem, setItemContent} from '../../redux/itemReduce';

import ItemOne from '../ItemOne/';

class Item extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.setName = this.setName.bind(this);
  }
  componentDidMount(){
    console.log(this.props);
  }
  setName(ev){
    let val = ev.target.value;
    // 触发action
    this.props.setItem({itemName: val});
  }
  render() {
    return (
      <div className='item'>
        <p>item 欢迎光临</p>
        <Link to='/'>跳转home</Link>
        <input type='text' onInput={this.setName}/>
        <div>
          <ItemOne />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return state.itemRedux;
}

// setItem,setItemContent是action方法
const mapDispatchToProps = {setItem, setItemContent};

export default connect(mapStateToProps, mapDispatchToProps)(Item);


```

### Provider

Provider 组件，可以让容器组件拿到 state。
Provider 在根组件一般在根组件的上一层包着，App 的所有子组件就默认都可以拿到 state 了。
而它的原理就是使用 context，store 放在了上下文对象 context 上面,然后，子组件就可以从 context 拿到 store。

```bash
// react-redux、redux-thunk、redux配合使用的写法基本是固定的，除非有特殊要求

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import router from './router.js';

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reduces'

// compose是增强store的，如浏览器插件redux监听store数据，添加中间件，如redux-thunk解决异步问题

const store = createStore(reducers, compose(applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f))

ReactDOM.render(
    <Provider store={store}>
        {router()}
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();

```

由于 Store 只有一个，如果数据冗余，那么会很占内存且结构复杂，而宁愿牺牲一些性能，进行一些运算达到获取目标结果，也比存储起来好。
还有数据的扁平化，由于使用 Store 把数据嵌套过深，会让数据的修改与获取加大难度，这样最好是数据的扁平化，那么就可以减少没有必要的非空判断，默认赋值之类的操作。

```bash
// 若嵌套深时获取数据
const d = state.A && state.A.B && state.A.B.C && state.A.B.C.D ;

//而扁平化
const d = state.A;
```

而 redux 的 Store 只有一个，但我们需要模块化的开发，那么就是需要把多个 Store 合并成一个，就要使用 combineReducers。

```bash
import {combineReducers} from 'redux';

import {home} from './redux/homeReduce';
import {item} from './redux/itemReduce';

let comReduces = {
    homeRedux: home,
    itemRedux: item
};

export default combineReducers(comReduces);
```

而合并后 Store 的对应模块的键值为对象的键值，如 homeRedux 下 Store，为 homeRedux。
