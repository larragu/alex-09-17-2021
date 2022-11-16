import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spread from '.';
import { initialResult as mockState } from '../../mocks';
import Mockstore from '../../../.storybook/decorators';

export default {
  title: 'Components/Spread',
  parameters: {
    layout: 'fullscreen',
  },
  component: Spread,
} as ComponentMeta<typeof Spread>;

const Template: ComponentStory<typeof Spread> = () => <Spread />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (story) => <Mockstore feedState={mockState}>{story()}</Mockstore>,
];
