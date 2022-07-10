import React from "react";

//interface: TypeScriptにおけるインターフェース(抽象型)
interface NoteState {
  counter: number;
}
interface NoteProps {
  word: string;
}

export default class Note extends React.Component<NoteProps, NoteState> {
  // ES6から導入されたアロー関数
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

  //コンストラクター
  constructor(props: NoteProps) {
    super(props);
    this.state = {
      counter: 1,
    };
  }

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
    return (
      <>
        {/* ボタンがクリックされたらonClickHandler()メソッドが発火され、その後Stateが更新される */}
        <button onClick={this.onClickHandler}>Click me!!</button>
        {/* Stateのカウンタ数だけ叫ぶ */}
        <p>{this.constructWord(this.state.counter, this.props.word)}</p>
      </>
    );
  }
}
