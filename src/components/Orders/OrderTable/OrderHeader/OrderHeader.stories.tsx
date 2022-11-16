import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrderHeader from '.';
import { OrderType } from '../../../../types';

export default {
  title: 'Components/Orders/OrderTable/OrderHeader',
  parameters: {
    layout: 'fullscreen',
  },
  component: OrderHeader,
} as ComponentMeta<typeof OrderHeader>;

const Template: ComponentStory<typeof OrderHeader> = (args) => (
  <OrderHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  orderType: OrderType.ASK,
};
