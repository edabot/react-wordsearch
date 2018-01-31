import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('includes welcome message', () => {
  const wrapper = shallow(<App match={{params: ""}}/>);
  const welcome = <div>Add your list of words here, separated by line breaks</div>
  expect(wrapper.contains(welcome)).toEqual(true);

});

it('renders without crashing', () => {
  shallow(<App match={{params: ""}}/>);
});
