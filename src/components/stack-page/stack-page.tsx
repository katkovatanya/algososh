import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import Stack from "./Stack";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [stack] = useState(() => new Stack<string>());
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState<"add" | "del" | "clear" | null>(
    null
  );
  const [highlight, setHighlight] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && input !== "") {
      setIsStarted("add");
      setHighlight(output.length);
      stack.push(input);
      setOutput([...stack.getElements()]);
      setInput("");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHighlight(null);
      setIsStarted(null);
    }
  };

  const onClickDel = async () => {
    if (output.length > 0) {
      setIsStarted("del");
      setHighlight(output.length - 1);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHighlight(null);
      stack.pop();
      setOutput([...stack.getElements()]);
      setIsStarted(null);
    }
  };

  const onClickClear = async () => {
    setIsStarted("clear");
    stack.clear();
    setOutput([]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsStarted(null);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.page}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.box}>
            <Input
              maxLength={4}
              isLimitText={true}
              value={input}
              onChange={onChangeInput}
            />
            <Button
              text="Добавить"
              disabled={!input || input === ""}
              isLoader={isStarted === "add"}
              type="submit"
            />
            <Button
              text="Удалить"
              onClick={onClickDel}
              disabled={output.length === 0}
              isLoader={isStarted === "del"}
            />
          </div>
          <Button
            text="Очистить"
            onClick={onClickClear}
            disabled={output.length === 0}
            isLoader={isStarted === "clear"}
          />
        </form>
        <div className={styles.circles}>
          {output &&
            output.map((element, index) => {
              return (
                <Circle
                  state={
                    highlight === index
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  letter={element}
                  key={index}
                  index={index}
                  head={index === output.length - 1 ? "top" : ""}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
