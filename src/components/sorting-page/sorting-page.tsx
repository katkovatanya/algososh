import React, { useState, useEffect } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { OutputArray } from "../../types/element-states";
import { ElementStates } from "../../types/element-states";
import { sortSelect, sortBubble, randomArr } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [isStarted, setIsStarted] = useState<"Ascending" | "Descending" | null>(
    null
  );
  const [output, setOutput] = useState<OutputArray<number>>([]);
  const [firstSelected, setFirstSelected] = useState<number | null>();
  const [secondSelected, setSecondSelected] = useState<number | null>();

  useEffect(() => {
    let array: OutputArray<number> = randomArr(3, 17).map((item) => {
      return { value: item, color: ElementStates.Default };
    });
    setOutput(array);
  }, []);

  const handleClickCreateArray = async () => {
    let array: OutputArray<number> = randomArr(3, 17).map((item) => {
      return { value: item, color: ElementStates.Default };
    });
    setOutput(array);
  };

  const handleClickAscending = async () => {
    setIsStarted("Ascending");
    sortingType === "select"
      ? await sortSelect(
          Direction.Ascending,
          output,
          setOutput,
          setFirstSelected,
          setSecondSelected
        )
      : await sortBubble(
          Direction.Ascending,
          output,
          setOutput,
          setFirstSelected,
          setSecondSelected
        );
    setIsStarted(null);
  };

  const handleClickDescending = async () => {
    setIsStarted("Descending");
    sortingType === "select"
      ? await sortBubble(
          Direction.Descending,
          output,
          setOutput,
          setFirstSelected,
          setSecondSelected
        )
      : await sortBubble(
          Direction.Descending,
          output,
          setOutput,
          setFirstSelected,
          setSecondSelected
        );
    setIsStarted(null);
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
            data-testid="sort-desc-button"
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={isStarted === "Ascending"}
            onClick={handleClickAscending}
            disabled={isStarted === "Descending"}
          />
          <Button
            data-testid="sort-asc-button"
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={isStarted === "Descending"}
            onClick={handleClickDescending}
            disabled={isStarted === "Ascending"}
          />
        </div>
        <Button
          data-testid="set-array-button"
          text="Новый массив"
          onClick={handleClickCreateArray}
          disabled={isStarted !== null}
        />
      </div>
      <div data-testid="container" className={styles.container}>
        {output &&
          output.map((element, index) => {
            return (
              <div data-testid="array-element" key={index}>
                <Column
                  index={element.value}
                  state={
                    firstSelected === index || secondSelected === index
                      ? ElementStates.Changing
                      : element.color
                  }
                  key={index}
                />
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
