# React 组件学习

### 一、组件和props
React的组件有两种定义方式，分别是class组件和函数组件。一个有效的 React 组件需要接收唯一带有数据的 `props`（代表属性）对象与并返回一个 React 元素。

如以下代码，这就是一个简单的函数组件，以及它的调用过程。
````
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Hayden" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
````
当我们将`name="Hayden"`作为参数传入`<Welcom>`组件并调用它时，它会将接收的属性以及子组件转换为`props`对象。并可以在组件中通过`props`对象获取到`name`的值。

除了函数组件，我们还可以通过使用es6的 class 来定义组件：
````
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
````

无论是使用函数声明还是通过 class 声明的组件，都决不能修改自身的`props`,所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

### 二、state的使用

不能修改`props`但当我们的组件需要随着数据的变化而动态更新时怎么办呢，这就需要用到`State`了，`State`和`props`类似，但是`State`是私有的，并且完全受控于当前组件。下面是一个使用`State`的例子：
````
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 10};
  }

  render() {
    return (
      <div>
        <h1>{this.state.num} seconds countdown</h1>
      </div>
    );
  }
}
````
注意在构造函数`constructor`中我们需要先通过`super(props)`将`props`传递到父类的构造函数中,然后再为`this.state`赋值。

上面已经编写了一个使用`State`的组件，那如何去改变`State`中的属性并更新组件呢，下面我们会用到生命周期方法：

`componentDidMount()`：这个方法会在组件已经被渲染到 DOM 中后运行。
`componentWillUnmount()`：这个方法组件从 DOM 中被移除时运行。
````
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 10};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if(num == 0) {
        return;
    }
    this.setState((state) => ({
      num: state.num - 1
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.num} seconds countdown</h1>
      </div>
    );
  }
}
````
这样一个完整的使用`State`的组件就完成了。注意，修改`State`中的属性时一定只能通过`this.setState`方法。

`State`的使用需要注意还有一点，`State`的更新可能是异步的，出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因此当你在需要依赖前一个值来更新你的`State`属性的话你需要让 `setState()` 接收一个函数而不是一个对象。用上一个 `state` 作为第一个参数，将此次更新被应用时的 `props` 做为第二个参数,我上面的`tick()`函数就是一个例子。

如果不需要依赖`state`或`props`的话可以直接这么写：
````
this.setState({
  num: 1
});
````

- 数据是向下流动的,不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

- `State`除了拥有并设置了它的组件，其他组件都无法访问。组件可以选择把它的 `state` 作为 `props` 向下传递到它的子组件中