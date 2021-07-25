# React context 学习

- 官方文档：https://react.docschina.org/docs/context.html

- 示例：https://github.com/Hayden-gh/React-Study/blob/main/my-app/src/pages/context.jsx

### 一、前言

在 React 应用中，一般来说数据都是通过 props 属性自上而下（由父及子）进行传递的，但这种方式在某些情况下并不是特别方便，例如一些全局参数的配置，地区偏好，UI 主题等属性。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

### 二、简单使用

先为主题颜色申明一个 context 默认值为`red`，只有当组件所处的树中没有匹配到 `Provider` 时，其默认值参数才会生效。

````
const ColorContext = React.createContext("red");
````

使用一个 `Provider` 来将当前的 `color` 传递给以下的组件树,无论多深，任何组件都能读取这个值。
在这个例子中，我们将 bule 作为当前的值传递下去。
- 当 `undefined` 传递给 `Provider` 的 `value` 时，消费组件的 `defaultValue` 不会生效。

- 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

- 当 `Provider` 的 `value` `值发生变化时，它内部的所有消费组件都会重新渲染。Provider` 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 `consumer` 组件在其祖先组件退出更新的情况下也能更新。

````
export class Grandparent extends React.Component {
    render() {
        return (
            <ColorContext.Provider value="bule">
                <Parant></Parant>
            </ColorContext.Provider>
        );
    }
}
````
中间的组件再也不必指明往下传递 `color` 。
````
class Parant extends React.Component {
    render() {
        return (
            <div>
                <Children></Children>
            </div>
        );
    }
}

class Children extends React.Component {
    render() {
        return (
            <div>
                <Grandchildren></Grandchildren>
            </div>
        );
    }
}

class Grandchildren extends React.Component {
    static contextType = ColorContext;
    render() {
        return <div>
            <h1>{this.context}</h1>
        </div>;
    }
}

````
在需要使用到的组件中指定 `contextType` 读取当前的 `ColorContext`,React 就会往上找到最近的 `ColorContext`，然后使用它的值。

`Context.Consumer`同样可以获取`context`的值。子元素必须要是一个函数，传递给函数的 value 值等同于往上组件树离这个 `context` 最近的 `Provider` 提供的 `value` 值。

````
class Parant extends React.Component {
    render() {
        return (
            <div>
                <ColorContext.Consumer>
                {value=>{
                    return <h1>{value}</h1>
                }}
                </ColorContext.Consumer>
                <Children></Children>
            </div>
        );
    }
}
````

context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

````
ColorContext.displayName = 'MyColor';
````

当要从一个在组件树中嵌套很深的组件中更新`context`时可以通过传递一个函数，使得 组件更新`context`

````
export const ThemeContext = React.createContext({
    theme: "dark",
    toggleTheme: () => {},
});
````

当消费多个`Context`时，为了确保`context`快速进行重渲染，React 需要使每一个`consumers`组件的`context`在组件树中成为一个单独的节点。

### 三、使用考虑

当`provider`的父组件进行重渲染时，可能会在`consumers`组件中触发意外的渲染。为了防止这种情况，将`value`状态提升到父节点的 state 里