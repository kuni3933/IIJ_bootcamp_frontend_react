import React from "react";

//interface: TypeScriptにおけるインターフェース(抽象型)
interface NoteState {}
interface NoteProps {
  counter: number;
  word: string;
}

export default class Note extends React.Component<NoteProps, NoteState> {
  // ES6から導入されたアロー関数
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  // (3, "Component") => "Component! Component!! Component!!!"
  constructWord = (counter: number, word: string) => {
    let words = "";
    [...Array(counter)].map(
      (_: number, i: number) => (words += word + "!".repeat(i + 1) + " ")
    );
    return words.trimEnd();
  };

  render() {
    return <p>{this.constructWord(this.props.counter, this.props.word)}</p>;
  }
}
