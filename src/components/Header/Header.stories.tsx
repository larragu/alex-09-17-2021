import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from '.';
import { initialResult as mockState } from '../../mocks';
import Mockstore from '../../../.storybook/decorators';

export default {
  title: 'Components/Header',
  parameters: {
    layout: 'fullscreen',
  },
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (story) => <Mockstore feedState={mockState}>{story()}</Mockstore>,
];
