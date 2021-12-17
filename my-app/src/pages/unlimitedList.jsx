import "./unlimitedList.css";
import { useRef, useState } from "react";

export function UnlimitedList() {
    let list = Array(100).fill(1);
    list = list.map((item, index) => {
        return <li key={index}>{`data${index + 1}`}</li>;
    });
    console.log(list);

    const bodyBox = useRef(null);
    const [displayList, setDisplayList] = useState(list.slice(0, 17));
    const [head, setHead] = useState(0);
    const [tail, setTail] = useState(17);

    const handleScroll = (e) => {
        let clientHeight = e.target.clientHeight; //可视区域高度
        let scrollTop = e.target.scrollTop; //滚动条滚动高度
        let scrollHeight = e.target.scrollHeight; //滚动内容高度
        console.log(clientHeight, scrollTop, scrollHeight);
        // if (scrollTop > 18) {
        const add = Math.floor(scrollTop + 16 / 18);
        // setDisplayList(list.slice(0 + add, 20 + add));
        setHead(add)
        // }
    };

    return (
        <div>
            <h1>List:</h1>
            <div className="list-div" onScroll={handleScroll} ref={bodyBox}>
                <ul
                    style={{
                        transform: `translateY(${head * 18}px)`,
                    }}
                >
                    {list.slice(0 + head, 20 + head).map((item) => {
                        return item;
                    })}
                </ul>
            </div>
        </div>
    );
}

function throttle(func, delay) {
    let prev = Date.now();
    return function () {
        const context = this;
        const args = arguments;
        const now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    };
}
