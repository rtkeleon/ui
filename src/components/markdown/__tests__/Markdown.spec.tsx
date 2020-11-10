import * as React from 'react';

import { shallow } from 'enzyme';

import { Markdown } from '../Markdown';

describe('Markdown', () => {
  it('renders', () => {
    const wrapper = shallow(<Markdown>{'This is test'}</Markdown>);

    expect(wrapper.contains('This is test')).toExist();
  });
});
