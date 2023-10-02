export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type OutputArray<T> = OutputArrayElement<T> [];
export type OutputArrayElement<T> = { value: T; color: ElementStates; };