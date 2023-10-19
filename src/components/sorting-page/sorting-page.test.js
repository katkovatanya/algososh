import { fireEvent, render, screen } from '@testing-library/react';
import { SortingPage } from './sorting-page';
import { BrowserRouter } from "react-router-dom";

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {

  it('Пустой массив', async () => {

    render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

    const container = screen.getByTestId('container');

    expect(container).not.toBeEmptyDOMElement()

  });

  it('массив из одного элемента', () => {

    const { getByTestId, getAllByTestId } = render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

    const newArrayButton = getByTestId('set-array-button');
    fireEvent.click(newArrayButton);

    const arrayElement = getAllByTestId('array-element')[0];
    expect(arrayElement).toBeInTheDocument();
  });

  it('массив из нескольких элементов', () => {

    render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

    screen.getByTestId('set-array-button').click();

    const arrayElement = screen.getAllByTestId('array-element');
    expect(arrayElement).not.toHaveLength(0);
  });

  it('По возрастанию', () => {

    render(<BrowserRouter> <SortingPage /> </BrowserRouter>);


    screen.getByTestId('set-array-button').click();

    screen.getByTestId('sort-asc-button').click();

    const arrayElement = screen.getAllByTestId('array-element');
    const values = arrayElement.map(element => parseInt(element.textContent));
    const sortedValues = [...values].sort((a, b) => a - b);
    expect(sortedValues).toEqual(sortedValues);
  });

  it('По убыванию', () => {
    render(<BrowserRouter> <SortingPage /> </BrowserRouter>);

    screen.getByTestId('set-array-button').click();

    screen.getByTestId('sort-desc-button').click();

    const arrayElement = screen.getAllByTestId('array-element');
    const values = arrayElement.map(element => parseInt(element.textContent));
    const sortedValues = [...values].sort((a, b) => b - a);
    expect(sortedValues).toEqual(sortedValues);
  });
});