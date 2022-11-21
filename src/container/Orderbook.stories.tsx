import { ComponentStory, ComponentMeta } from '@storybook/react';
import Orderbook from '.';
import { initialResult as mockState } from '../mocks';
import Mockstore from '../../.storybook/decorators';

export default {
  title: 'Components/Orderbook',
  parameters: {
    layout: 'fullscreen',
  },
  component: Orderbook,
} as ComponentMeta<typeof Orderbook>;

const socketMock = {
  isConnected: true,
  isSubscribed: true,
  sendingMessage: false,
  connectionError: false,
  subscribing: false,
  isConnecting: false,
};

const Template: ComponentStory<typeof Orderbook> = () => <Orderbook />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (story) => (
    <Mockstore socketState={socketMock} feedState={mockState}>
      {story()}
    </Mockstore>
  ),
];
