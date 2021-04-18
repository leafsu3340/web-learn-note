import { React, Component, useState } from "../CONST";

class ClassComponent extends Component {
  render() {
    return <div className="class border">{this.props.name}</div>;
  }
}

function FunctionComponent({ name }) {
  const [count, setCount] = useState(0);
  return (
    <div className="function border">
      <p>{name}</p>
      <button onClick={() => setCount(count+1)}>{count}</button>
    </div>
  );
}

// function FragmentComponent(props) {
//   return [1, 2, 3].map((item) => (
//     <Fragment key={item}>
//       <li>哈哈</li> <li>呵呵</li>
//     </Fragment>
//   ));
// }

const jsx = (
  <div className="box border">
    <p>开课吧</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="class组件" />
    {/* <ul>
      <li>asasa</li>
      <FragmentComponent />
    </ul> */}

    <>
      <h1>哈哈</h1>
      <h1>呵呵</h1>
    </>
  </div>
);

export default jsx;

// console.log("React", React.version); //sy-log
// 文本节点
// 原生标签节点
// 函数组件
// 类组件
