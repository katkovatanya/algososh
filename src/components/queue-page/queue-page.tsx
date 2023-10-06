import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import Queue from "./Queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue] = useState(() => new Queue<string>());

  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);

  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);

  const [isStarted, setIsStarted] = useState<"add" | "del" | "clear" | null>(
    null
  );
  const [highlight, setHighlight] = useState<number | null>(null);

  useEffect(() => {
    setOutput([...queue.getElements()]);
  }, []);

  const handleClickAdd = async () => {
    if (
      input &&
      input !== "" &&
      head !== output.length - 1 &&
      tail !== output.length - 1
    ) {
      setIsStarted("add");
      tail !== null ? setHighlight(tail + 1) : setHighlight(0);
      queue.enqueue(input);
      setHead(queue.getHead);
      setTail(queue.getTail);
      setOutput([...queue.getElements()]);
      setInput("");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHighlight(null);
      setIsStarted(null);
    }
  };

  const handleClickDel = async () => {
    setIsStarted("del");
    setHighlight(head);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setHighlight(null);
    queue.dequeue();
    setHead(queue.getHead);
    setTail(queue.getTail);
    setOutput([...queue.getElements()]);
    setIsStarted(null);
  };

  const handleClickClear = async () => {
    setIsStarted("clear");
    queue.clear();
    setOutput([...queue.getElements()]);
    setHead(queue.getHead);
    setTail(queue.getTail);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsStarted(null);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.page}>
        <form className={styles.form}>
          <div className={styles.box}>
            <Input
              maxLength={4}
              isLimitText={true}
              value={input}
              onChange={onChangeInput}
            />
            <Button
              text="Добавить"
              onClick={handleClickAdd}
              disabled={!input || input === ""}
              isLoader={isStarted === "add"}
            />
            <Button
              text="Удалить"
              onClick={handleClickDel}
              disabled={head === null || tail === null}
              isLoader={isStarted === "del"}
            />
          </div>
          <Button
            text="Очистить"
            onClick={handleClickClear}
            disabled={head === null}
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
                  head={index === head ? "head" : ""}
                  tail={index === tail ? "tail" : ""}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
