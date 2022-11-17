import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderRow from '.';
import { OrderType } from '../../../../types';

export default {
  title: 'Components/Orders/OrderTable/OrderRow',
  parameters: {
    layout: 'fullscreen',
  },
  component: OrderRow,
} as ComponentMeta<typeof OrderRow>;

const Template: ComponentStory<typeof OrderRow> = (args) => (
  <OrderRow {...args} />
);

export const Default = Template.bind({});
Default.args = {
  total: 98676,
  size: 78676,
  price: 43403.0,
  orderType: OrderType.ASK,
};
