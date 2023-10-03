import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { useState } from "react";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<string>();
  const [output, setOutput] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoader(true);
    const resultArray: number[] = [];
    const number = Number(input);
    if (!Number.isNaN(number) && number > 0) {
      for (let i = 0; i <= number; i++) {
        if (i < 2) {
          i === 0 ? resultArray.push(0) : resultArray.push(1);
        } else {
          resultArray.push(resultArray[i - 2] + resultArray[i - 1]);
        }
        setOutput([...resultArray]);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    setIsLoader(false);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.page}>
        <form className={style.box}>
          <Input
            placeholder="Введите число"
            type="number"
            max={19}
            min={1}
            maxLength={19}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
          />
          <Button
            disabled={!input || input.length < 1}
            isLoader={isLoader}
            onClick={handleClick}
            text="Рассчитать"
          />
        </form>
        <div className={style.circles}>
        {output && output.map((element, index) => {
          return(
            <Circle letter={element.toString()} tail={index.toString()} key={index} />
          )
        })}
        </div>
      </div>
    </SolutionLayout>
  );
};
