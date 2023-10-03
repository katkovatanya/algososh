import React, { useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { OutputArray } from "../../types/element-states";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState<"select" | "bubble">("select");
  const [loader, setLoader] = useState<"Ascending" | "Descending" | null>(null);
  const [output, setOutput] = useState<OutputArray<string>>([]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            name="sortType"
            value="select"
            onSelect={() => {
              setSortingType("select");
            }}
          />
          <RadioInput
            label="Пузырек"
            name="sortType"
            value="bubble"
            onSelect={() => {
              setSortingType("bubble");
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            isLoader={loader === "Ascending"}
            // onClick={handleClickAscending}
            disabled={loader === "Descending"}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            isLoader={loader === "Descending"}
            // onClick={handleClickDescending}
            disabled={loader === "Ascending"}
          />
        </div>
        <Button text="Новый массив" disabled={loader !== null} />
      </div>
      <div className={styles.container}>
        {output &&
          output.map((element, index) => {
            return (
              <Column
                index={Number(element.value)}
                // state={firstSelected === index || secondSelected === index ? ElementStates.Changing : element.color}
                key={index}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
