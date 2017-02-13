import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PollList } from 'src/features/poll';

describe('poll/PollList', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <PollList />
    );

    expect(
      renderedComponent.find('.poll-poll-list').node
    ).to.exist;
  });
});
