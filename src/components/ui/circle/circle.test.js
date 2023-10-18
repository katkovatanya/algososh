import renderer from 'react-test-renderer';
import { Circle } from "./circle";
import { ElementStates } from '../../../types/element-states';

describe('Тестирование компонента Circle', function () {

  it('без буквы', function () {
    const element = renderer.create(<Circle letter="" />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с буквами', function () {
    const element = renderer.create(<Circle letter="a" />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с head', function () {
    const element = renderer.create(<Circle head="head" />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с react-элементом в head', function () {
    const element = renderer.create(<Circle head={<Circle isSmall={true} />} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с tail', function () {
    const element = renderer.create(<Circle tail="tail" />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с react-элементом в tail', function () {
    const element = renderer.create(<Circle tail={<Circle isSmall={true} />} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с index', function () {
    const element = renderer.create(<Circle index={0} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('с пропсом isSmall === true', function () {
    const element = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('в состоянии default', function () {
    const element = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('в состоянии changing', function () {
    const element = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('в состоянии modified', function () {
    const element = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(element).toMatchSnapshot();
  });

})