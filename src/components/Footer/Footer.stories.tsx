import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer from '.';
import { Market } from '../../types';

export default {
  title: 'Components/Footer',
  parameters: {
    layout: 'fullscreen',
  },
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  isToggleFeedEnabled: true,
  selectedMarket: Market.XBT_USD,
  onToggleFeed: () => {},
};
