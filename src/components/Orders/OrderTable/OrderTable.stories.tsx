import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderTable from '.';
import { OrderType } from '../../../types';
import { ask as askMock } from '../../../mocks';

export default {
  title: 'Components/Orders/OrderTable',
  parameters: {
    layout: 'fullscreen',
  },
  component: OrderTable,
} as ComponentMeta<typeof OrderTable>;

const Template: ComponentStory<typeof OrderTable> = (args) => (
  <OrderTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  feed: askMock,
  orderType: OrderType.ASK,
};
