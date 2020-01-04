## react 的安装

由于 react 的需要依赖一些的技术栈才能方便进行正常的开发，但这对学习它的成本会提高很多，如要需要会 webpack、gulp、Babel 等模块与构建工具，这样在没有开始就倒在了入门路上，而这些配置一般都可以是固定的，而使用脚手架，一行代码即可。

但 react 脚手架过于复杂，对初学者来说，没有特殊要求可以不修改配置之类，不过一旦涉及这方面需求就懵逼了，因为 react 脚手架是 node 写的，webpack 只是它的一部分，也是核心部分，所以有 webpack 初步经验，为了更好的了解可以选择自己搭建。

```bash
// 安装全局的create-react-app
npm install --g create-react-app

// 在指定目录创建react项目
create-react-app 项目名

// 进入项目
cd 项目名

// 启动项目
npm start

// 对webpack进行操作，执行就无法逆转，如果有必要备份一份
npm run eject
```

## JSX

JSX 是 JavaScript 的扩展语言，让 HTML 可以在 js 里编写，但使用模块一定要引入 react,而一般自定义的组件元素首字母都是大写，而这样区别 html 与 react 组件，而在 HTML 中大量的绑定事件是不规范的。
原因有以下:
2、如 onclick 添加的事件处理函数是在全局环境下执行的，这污染了全局环境，很容易产生意料不到的后果；
3、给很多 DOM 元素添加 onclick 事件，可能会影响网页的性能，毕竟，网页需要的事件处理函数越多，性能就会越低；
4、对于使用 onclick 的 DOM 元素，如果要动态地从 DOM 树中删掉的话，需要把对应的时间处理器注销，假如忘了注销，就可能造成内存泄露，这样的 bug 很难被发现。

而以上的原因都是针对复杂的项目或单页面项目。

但 JSX 没有这方面的缺点，首先，如 onClick 挂载的每个函数，都可以控制在组件范围内，不会污染全局空间。我们在 JSX 中看到一个组件使用了 onClick，但并没有产生直接使用 onclick 的 HTML，而是使用了事件委托的方式处理点击事件，无论有多少个 onClick 出现，其实最后都只在 DOM 树上添加了一个事件处理函数，挂在最顶层的 DOM 节点上。所有的点击事件都被这个事件处理函数捕获，然后根据具体组件分配给特定函数，使用事件委托的性能要比为每个 onClick 都挂载一个事件处理函数要高。

React 控制了组件的生命周期，在 unmount 的时候自然能够清除相关的所有事件处理函数，内存泄露也不再是一个问题。

在使用 jsx 时，添加类名要使用 className,因为 class 是保留关键字，使用 js 的保留关键字一般使用报错的，但如果习惯使用 class 可以添加相对的兼容包。

## React 与 JQuery 区别

JQuery 操作是选中一些 DOM 元素，然后对这些元素做一些操作，而在大项目中频繁的选择各种各样的元素，而一种元素有不同选择方式，使得项目很复杂，难以维护。
React 操作就只注重数据怎么操作，而界面对数据进行渲染，而无需关心怎么选择元素操作。既重要的是区分开哪些属于 data，哪些属于 render，想要更新用户界面，要做的就是更新 data，用户界面自然会做出响应。

而 React 渲染都不是整体渲染的，React 利用 Virtual DOM，让每次渲染都只重新渲染最少的 DOM 元素。
Web 前端开发关于性能优化有一个原则尽量减少 DOM 操作。虽然 DOM 操作也只是一些简单的 JavaScript 语句，但是 DOM 操作会引起浏览器对网页进行重新布局，重新绘制，这就是一个比 JavaScript 语句执行慢很多的过程。
Virutal DOM 不会触及浏览器的部分，只是存在于内存空间的树形结构，每次自上而下渲染 React 组件时，会对比这一次产生的 Virtual DOM 和上一次渲染的 Virtual DOM ，对比就会发现差别，然后修改真正的 DOM 树时就只需要触及差别中的部分就行。
所以 react 的渲染基本是达到最优渲染，比人为的操作 DOM 省心多了。

## React 组件的数据

React 组件的数据分为两种，props 和 state，无论 props 或者 state 的改变，都可能引发组件的重新渲染，那么，设计一个组件的时候，什么时候选择用 prop?什么时候选择用 state 呢?其实原则很简单，props 是组件的对外接口，state 是组件的内部状态，对外用 props，内部用 state。

### props

在 React 中，props 是从外部传递给组件的数据，一个 React 组件通过定义自己能够接受的 props 就定义了自己的对外公共接口。
每个 React 组件都是独立存在的模块，组件之外的一切都是外部世界，外部世界就是通过 props 来和组件对话的。

```bash
// 给prop赋值
<Demo test={100} />

// 读取props
class Demo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}
```

但由于是对外公布的接口，那么传入时应该有自己的一套规则，如前端与后端人员对接时后端人员都会对自己的接口，公布一份接口文档，方便人员的对接，而不是让对接人员自己猜想传什么字段，才能正常使用接口，而 props 就需要这样做，使用[propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)规范接口，让使用组件的人员一目了然，知道组件需要什么字段。

而 propTypes 是一种限制，会在运行时与静态代码时检查代码。

```bash

class Demo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}

// test字符串并必须传入
Demo.propTypes = {
    test: PropTypes.string.isRequired
}

// 如何没有传入，浏览器的控制台会报错，但不影响运行
```

但由于 props 不一定都要传入，这样可以使用 defaultProps 设置默认值。

```bash
class Demo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}

Demo.defaultProps = {
    test: '测试'
}

或
class Demo extends Component {
    static defaultProps{
        test: '测试'
    }

    constructor(props){
        super(props);
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}

如果你是使用typescript编写的项目，那么就可以不使用propTypes，typescript特性就是静态类型检查。

```

### state

由于 React 组件不能修改传入的 props，所以需要记录自身数据变化，就要使用 state。

```bash
class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            test: props.test
        }
    }
    render(){
        let {test} = this.state;
        return (
            <div>{test}</div>
        );
    }
}
```

但 state 的修改需要使用特定函数，this.setState()进行修改，才能触发 view 与 data 的同步更新，若直接对 this.state 对象进行赋值操作，是不会触发的，但对象里的值是发生了改变，只是没有更新视图，当触发 this.setState()会把变化更新，所以修改一定要使用 this.setState。

```bash

class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            test: props.test
        }
        this.changeFn = this.changeFn.bind(this);
    }
    changeFn(event){

        this.setState({test: event.target.value});
    }
    render(){
        let {test} = this.state;
        return (
            <div>{test}</div>
            <input value={test} onChange={changeFn} type='text' />
        );
    }
}

```

### 组件生命周期

React 严格定义了组件的生命周期，生命周期可能会经历如下三个过程：
装载过程，也就是把组件第一次在 DOM 树中渲染的过程；
更新过程，当组件被重新渲染的过程；
卸载过程，组件从 DOM 中删除的过程。
三种不同的过程，React 库会依次调用组件的一些成员函数，这些函数称为生命周期函数。所以，要定制一个 React 组件，实际上就是定制这些生命周期函数。

装载过程中会触发:

```bash
constructor
getlnitialState
getDefaultProps
static getDerivedStateFromProps
render
componentDidMount
```

getlnitialState 与 getDefaultProps 在 React.createClass 中有效，在 ES6 中不能使用这个，所以一般都不使用。
constructor，初始化的操作都会在这里进行，如 this.state，事件处理函数的 this 绑定等。
render 函数无疑是 React 组件中最重要的函数，一个 React 组件可以忽略其他所有函数都不实现，但是一定要实现 render 函数，因为所有 React 组件的父类 React.Component 类对除 render 之外的生命周期函数都有默认实现。
componentDidMount 是 render 函数执行后 DOM 加载出来才触发的，所以对操作 DOM 或数据请求都可以在这里进行。

getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容,但此方法无法访问组件实例，因为它是一个静态方法。

```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: props.email };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.email !== state.email) {
      return { email: props.email };
    }
    return null;
  }

  render() {
    <div>
        Email: <input value={this.state.email} />
    </div>
  }
}
```

更新过程会触发:

```bash
// 依次触发
static getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate
```

```bash
class Parent extends Component{
    constructor(props){
        super(props);
        this.state = {
            test: "aaa"
        }
    }
    render(){
        let {test} = this.state;
        return (
            <Child test={test}/>
        );
    }
}

class Child extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}
```

shouldComponentUpdate 是对数据的改变是否触发 render 来更新视图的，对性能优化很重要，它决定了一个组件什么时候不需要渲染。
当它返回 false 时不渲染，为 true 渲染，默认时都为 true 的。

```bash
class Parent extends Component{
    constructor(props){
        super(props);
        this.state = {
            test: "aaa"
        }
    }
    render(){
        let {test} = this.state;
        return (
            <Child test={test}/>
        );
    }
}

class Child extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        {test} = nextProps;
        if(test === this.props.test){
            return false;
        }
        return true;
    }
    render(){
        let {test} = this.props;
        return (
            <div>{test}</div>
        );
    }
}
```

getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。

```
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ?
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

componentDidUpdate 既渲染后的钩子函数。

卸载过程只涉及一个函数 componentWillUnmount，为了在组件被卸载进行一些操作，避免造成污染之类的，如内存溢出。

### 即将废弃的钩子

```
componentWillMount
componentWillUpdate
componentWillReceiveProps
```

componentWillMount 组件初始化时会出现在 constructor 后 render 前。

componentWillUpdate 组件状态更新时会触发，在 render 之前。

componentWillReceiveProps 组件初始化不会触发，但父组件的状态更新就会触发。

由于 react 团队启用异步渲染方式，把一些长期被使用者不正当使用的生命周期钩子都准备弃用，以达到未来更新的版本更完善做准备。

[资料](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

[资料 2](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

[例子项目](https://github.com/793338023/react-antd-typescript)
