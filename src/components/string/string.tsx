import React, { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates, OutputArray } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<OutputArray<string>>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const reverseString = async (str: string) => {
    const arr = str.split("");
    const length = arr.length;
    setIsLoader(true);
    let stateArray: OutputArray<string> = [];
    stateArray = arr.map((item, i) => {
      return (stateArray[i] = {
        value: item,
        color: ElementStates.Default,
      });
    });
    setOutput(stateArray);
    for (let i = 0; i < length / 2; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      stateArray[length - 1 - i] = {
        value: arr[i],
        color: ElementStates.Changing,
      };
      stateArray[i] = {
        value: arr[length - 1 - i],
        color: ElementStates.Changing,
      };
      setOutput(stateArray);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      stateArray[i].color = ElementStates.Modified;
      stateArray[length - 1 - i].color = ElementStates.Modified;
      setOutput(stateArray);
    }
    setIsLoader(false);
    return stateArray;
  };




  const handleClick = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    reverseString(input);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.page}>
        <form onSubmit={handleClick} className={style.box}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={input}
            onChange={onChangeInput}
          />
          <Button
            disabled={!input || input.length < 1}
            // isLoader={isLoader}
            onClick={handleClick}
            text="Развернуть"
          />
        </form>
        <div className={style.circles}>
          {output.map((element, index) => (
            <Circle
              key={index}
              state={element.color}
              letter={element.value}
              extraClass={index === output.length / 2 - 1 ? style.center : ""}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
