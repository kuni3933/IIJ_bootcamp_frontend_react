import React from "react";

//interface: TypeScriptにおけるインターフェース(抽象型)
interface NoteState {
  counter: number;
  isLoaded: boolean;
}
interface NoteProps {
  word: string;
}

// ただ時間待ちするだけの関数(タスク)
const someHeavyTask = (handler: () => void) => {
  // 2秒後に引数として渡された関数`handler`がキックされます
  // header() => void
  // 処理時に外から渡されたサブルーチンを実行することをコールバックと呼びます
  setTimeout(() => {
    handler();
  }, 2000);
};

export default class Note extends React.Component<NoteProps, NoteState> {
  // ES6から導入されたアロー関数
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  //コンストラクター
  constructor(props: NoteProps) {
    super(props);
    this.state = {
      counter: 1,
      isLoaded: false, //初期値falseでロード中扱いにしておく
    };
  }

  // DOMツリーにコンポーネントが追加された直後に呼び出されるメソッド
  // React.Componentに定義されているメソッドです
  componentDidMount = () => {
    someHeavyTask(() =>
      this.setState({
        isLoaded: true,
      })
    );
  };

  //クリックイベント時のハンドラー
  onClickHandler = () => {
    // StateをsetStateメソッド経由で更新
    // setStateでStateを更新するとDOMの再レンダリングが行われる
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  // (3, "Component") => "Component! Component!! Component!!!"
  constructWord = (counter: number, word: string) => {
    let words = "";
    [...Array(counter)].map(
      (_: number, i: number) => (words += word + "!".repeat(i + 1) + " ")
    );
    return words.trimEnd();
  };

  render() {
    const loading = <p>Loading...</p>;
    const component = (
      <>
        <button onClick={this.onClickHandler}>Click me!!</button>
        <p>{this.constructWord(this.state.counter, this.props.word)}</p>
      </>
    );

    // StateのisLoadedがfalseの場合、"Loading..."が表示されます
    const note = this.state.isLoaded ? component : loading;
    return note;
  }
}
