import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'features/poll/DefaultPage';

describe('poll/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      poll: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.poll-default-page').node
    ).to.exist;
  });
});
