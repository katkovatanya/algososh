import { Direction } from "../../types/direction";
import { OutputArray } from "../../types/element-states";
import { ElementStates } from "../../types/element-states";

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

export function randomArr(minLen: number = 3, maxLen: number = 17): number[] {
  const arr: number[] = [];
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}

export const sortSelect = async (
  type: Direction,
  outData: OutputArray<number>,
  setOutData: (outData: OutputArray<number>) => void,
  setFirstSelected: (number: number | null) => void,
  setSecondSelected: (number: number | null) => void
) => {
  let tempArray = outData;
  let minimalIndex: number;
  for (let i = 0; i < tempArray.length; i++) {
    setFirstSelected(i);
    minimalIndex = i;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    for (let j = i + 1; j < tempArray.length; j++) {
      setSecondSelected(j);
      if (type === Direction.Ascending) {
        minimalIndex =
          tempArray[minimalIndex].value < tempArray[j].value ? minimalIndex : j;
      }
      if (type === Direction.Descending) {
        minimalIndex =
          tempArray[minimalIndex].value > tempArray[j].value ? minimalIndex : j;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (minimalIndex === i) {
      tempArray[i].color = ElementStates.Modified;
    } else {
      tempArray = swap(tempArray, i, minimalIndex);
      tempArray[i].color = ElementStates.Modified;
    }
    setOutData([...tempArray]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  setFirstSelected(null);
  setSecondSelected(null);
  return tempArray;
};

export const sortBubble = async (
  type: Direction,
  outData: OutputArray<number>,
  setOutData: (outData: OutputArray<number>) => void,
  setFirstSelected: (number: number | null) => void,
  setSecondSelected: (number: number | null) => void
) => {
  let tempArray = outData;

  for (let i = 0; i < tempArray.length; i++) {
    for (let j = 0; j < tempArray.length - 1 - i; j++) {
      setFirstSelected(j);
      setSecondSelected(j + 1);
      if (type === Direction.Ascending) {
        if (tempArray[j].value > tempArray[j + 1].value) {
          tempArray = swap(tempArray, j, j + 1);
        }
      }
      if (type === Direction.Descending) {
        if (tempArray[j].value < tempArray[j + 1].value) {
          tempArray = swap(tempArray, j, j + 1);
        }
      }
      setOutData([...tempArray]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    tempArray[tempArray.length - 1 - i].color = ElementStates.Modified;
    setOutData([...tempArray]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  setFirstSelected(null);
  setSecondSelected(null);
  return tempArray;
};
