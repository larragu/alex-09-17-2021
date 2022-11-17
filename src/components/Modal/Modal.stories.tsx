import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Modal from '.';
import { ModalStatus } from '../../types';

export default {
  title: 'Components/Modal',
  parameters: {
    layout: 'fullscreen',
  },
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((isOpen: boolean) => !isOpen);
  };

  return (
    <>
      <button onClick={clickHandler}>OPEN MODAL</button>
      {isOpen && <Modal {...args} onClose={clickHandler} />}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: 'How are you?',
  buttonText: 'CLOSE',
  onClose: () => {},
};

export const Error = Template.bind({});
Error.args = {
  message: 'Connection Failed',
  buttonText: 'retry',
  status: ModalStatus.ERROR,
  onClose: () => {},
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'Orderbook Disconnected',
  buttonText: 'reconnect',
  status: ModalStatus.WARNING,
  onClose: () => {},
};

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.append(modalRoot);
