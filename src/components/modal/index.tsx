import React from 'react';
import { Dialog } from '@headlessui/react';
import Button from '../button';
import { noop } from '../../helpers/utils';

export interface IModalAction {
  name: string;
  func: Function;
}

export interface IModalProps {
  title: string;
  description: string;
  actions?: IModalAction[];
}

const Modal = ({ title, description, actions = [] }: IModalProps) => {
  return (
    <Dialog open onClose={noop} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-xl mx-auto w-[800px] p-4">
          <Dialog.Title className="text-3xl font-semibold text-gray-800 mb-2">{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>

          {actions.length > 0 && (
            <div className="flex gap-2 items-center p-4">
              {actions.map((ac) => {
                <Button onClick={ac.func}>{ac.name}</Button>;
              })}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
