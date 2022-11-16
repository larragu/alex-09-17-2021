import { ComponentStory, ComponentMeta } from '@storybook/react';
import Orders from '.';
import { initialResult as mockState } from '../../mocks';
import Mockstore from '../../../.storybook/decorators';

export default {
  title: 'Components/Orders',
  parameters: {
    layout: 'fullscreen',
  },
  component: Orders,
} as ComponentMeta<typeof Orders>;

const Template: ComponentStory<typeof Orders> = () => <Orders />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (story) => <Mockstore feedState={mockState}>{story()}</Mockstore>,
];
