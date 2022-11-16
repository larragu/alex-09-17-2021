import { ComponentStory, ComponentMeta } from '@storybook/react';
import BarGraph from '.';
import { OrderType } from '../../types';

export default {
  title: 'Components/BarGraph',
  parameters: {
    layout: 'fullscreen',
  },
  component: BarGraph,
} as ComponentMeta<typeof BarGraph>;

const Template: ComponentStory<typeof BarGraph> = (args) => (
  <BarGraph {...args} />
);

export const Default = Template.bind({});
Default.args = {
  depthArray: [
    2072, 8683, 11183, 21183, 36055, 41258, 51258, 65929, 66849, 71849, 136865,
    151865, 155012, 215622, 223873, 232537,
  ],
  orderType: OrderType.ASK,
};
