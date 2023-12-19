import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { StringComponent } from './string';
import { BrowserRouter } from "react-router-dom";

describe('Тестирование алгоритма разворота строки', () => {

  it('с чётным количеством символов', async () => {
    render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

    const button = screen.getByTestId('reverse-button');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('t');
      expect(screen.getAllByTestId('circle')[1]).toHaveTextContent('s');
      expect(screen.getAllByTestId('circle')[2]).toHaveTextContent('e');
      expect(screen.getAllByTestId('circle')[3]).toHaveTextContent('t');
    }, { timeout: 3000 })
  });

  it('с нечетным количеством символов', async () => {
    render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

    const button = screen.getByTestId('reverse-button');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 'test1' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('1');
      expect(screen.getAllByTestId('circle')[1]).toHaveTextContent('t');
      expect(screen.getAllByTestId('circle')[2]).toHaveTextContent('s');
      expect(screen.getAllByTestId('circle')[3]).toHaveTextContent('e');
      expect(screen.getAllByTestId('circle')[4]).toHaveTextContent('t');
    }, { timeout: 3000 })
  });

  it('с одним символом', async () => {
    render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

    const button = screen.getByTestId("reverse-button");
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId('circle')[0]).toHaveTextContent('t');
    }, { timeout: 3000 })

  });

  it('пустая строка', async () => {
    render(<BrowserRouter> <StringComponent /> </BrowserRouter>);

    const button = screen.getByTestId("reverse-button");
    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByLabelText('circle')).toBeNull();
    }, { timeout: 3000 })
  });
});