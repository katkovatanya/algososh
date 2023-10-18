import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from "@testing-library/react";

describe('Тестирование компонента Button', function () {
  it('кнопка с текстом', function () {
    const element = renderer.create(<Button text="тест" />).toJSON();
    expect(element).toMatchSnapshot();
  });
  it('кнопка без текста', function () {
    const element = renderer.create(<Button text="" />).toJSON();
    expect(element).toMatchSnapshot();
  });
  it('заблокированная кнопка', function () {
    const element = renderer.create(<Button text="тест" disabled={true} />).toJSON();
    expect(element).toMatchSnapshot();
  });
  it('кнопка без текста', function () {
    const element = renderer.create(<Button text="тест" isLoader={true} />).toJSON();
    expect(element).toMatchSnapshot();
  });
  it('Проверка колбека', function () {
    const testCallback = jest.fn();
    render(<Button text="TEST" onClick={testCallback} />);
    fireEvent.click(screen.getByText('TEST'));
    expect(testCallback).toHaveBeenCalled();
  });
})