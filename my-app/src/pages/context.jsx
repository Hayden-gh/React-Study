import React from "react";

const ColorContext = React.createContext("red");
ColorContext.displayName = "MyColor";

export const ThemeContext = React.createContext({
    theme: "dark",
    toggleTheme: () => {},
});

export class Grandparent extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “hello” 作为当前的值传递下去。
        return (
            <ColorContext.Provider value="bule">
                <Parant></Parant>
            </ColorContext.Provider>
        );
    }
}

class Parant extends React.Component {
    render() {
        return (
            <div>
                <ColorContext.Consumer>
                    {(value) => {
                        return <h1>{value}</h1>;
                    }}
                </ColorContext.Consumer>
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
        return (
            <div>
                <h1>{this.context}</h1>
            </div>
        );
    }
}
