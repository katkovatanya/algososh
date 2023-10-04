import React, { useState, FormEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { OutputArray } from "../../types/element-states";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [isStarted, setIsStarted] = useState<"Ascending" | "Descending" | null>(
    null
  );
  const [output, setOutput] = useState<OutputArray<number>>([]);
  const [firstSelected, setFirstSelected] = useState<number | null>();
  const [secondSelected, setSecondSelected] = useState<number | null>();

  function randomArr(minLen: number = 3, maxLen: number = 17): number[] {
    const arr: number[] = [];
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    for (let i = 0; i < len; i++) {
      arr.push(Math.floor(Math.random() * 101));
    }
    return arr;
  }

  const handleClickCreateArray = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
    let array: OutputArray<number> = randomArr(3, 17).map((item) => {
      return { value: item, color: ElementStates.Default };
    });
    setOutput(array);
  };

  const handleClickAscending = () => {
    setIsStarted("Ascending");
    console.log(sortingType);
    sortingType === "select"
      ? selectionSort(Direction.Ascending)
      : bubbleSort(Direction.Ascending);
    setIsStarted(null);
  };
  const handleClickDescending = () => {
    setIsStarted("Descending");
    console.log(sortingType);
    sortingType === "select"
      ? selectionSort(Direction.Descending)
      : bubbleSort(Direction.Descending);
    setIsStarted(null);
  };

  const swap = (
    arr: OutputArray<number>,
    firstIndex: number,
    secondIndex: number
  ) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    return arr;
  };

  const selectionSort = async (type: Direction) => {
    let tempArray = output;
    let minimalIndex: number;
    for (let i = 0; i < tempArray.length; i++) {
      setFirstSelected(i);
      minimalIndex = i;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      for (let j = i + 1; j < tempArray.length; j++) {
        setSecondSelected(j);
        if (type === Direction.Ascending) {
          minimalIndex =
            tempArray[minimalIndex].value < tempArray[j].value
              ? minimalIndex
              : j;
        }
        if (type === Direction.Descending) {
          minimalIndex =
            tempArray[minimalIndex].value > tempArray[j].value
              ? minimalIndex
              : j;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (minimalIndex === i) {
        tempArray[i].color = ElementStates.Modified;
      } else {
        tempArray = swap(tempArray, i, minimalIndex);
        tempArray[i].color = ElementStates.Modified;
      }
      setOutput([...tempArray]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setFirstSelected(null);
    setSecondSelected(null);
  };

  const bubbleSort = async (type: Direction) => {
    let tempArray = output;

    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray.length - 1 - i; j++) {
        setFirstSelected(j);
        setSecondSelected(j + 1);
        if (type === Direction.Ascending) {
          if (tempArray[j].value > tempArray[j + 1].value) {
            tempArray[j].color = ElementStates.Default;
            tempArray[j + 1].color = ElementStates.Default;
            setOutput([...tempArray]);
            tempArray = swap(tempArray, j, j + 1);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        if (type === Direction.Descending) {
          if (tempArray[j].value < tempArray[j + 1].value) {
            tempArray[j].color = ElementStates.Default;
            tempArray[j + 1].color = ElementStates.Default;
            setOutput([...tempArray]);
            tempArray = swap(tempArray, j, j + 1);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }
      tempArray[tempArray.length - 1 - i].color = ElementStates.Modified;
      setOutput([...tempArray]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setFirstSelected(null);
    setSecondSelected(null);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            name="sortType"
            value="select"
            onChange={() => {
              setSortingType("select");
              console.log(sortingType);
            }}
          />
          <RadioInput
            label="Пузырек"
            name="sortType"
            value="bubble"
            onChange={() => {
              setSortingType("bubble");
              console.log(sortingType);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isStarted === "Ascending"}
            onClick={handleClickAscending}
            disabled={isStarted === "Descending"}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isStarted === "Descending"}
            onClick={handleClickDescending}
            disabled={isStarted === "Ascending"}
          />
        </div>
        <Button
          text="Новый массив"
          onClick={handleClickCreateArray}
          disabled={isStarted !== null}
        />
      </div>
      <div className={styles.container}>
        {output &&
          output.map((element, index) => {
            return (
              <Column
                index={element.value}
                state={
                  firstSelected === index || secondSelected === index
                    ? ElementStates.Changing
                    : element.color
                }
                key={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
