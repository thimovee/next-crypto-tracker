"use client"
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

type DialogProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
    title: React.ReactNode;
}

export const Modal: React.FC<DialogProps> = ({ trigger, content, title }) => {
    return (
        <DialogPrimitive.Root>
            <DialogPrimitive.Trigger>{trigger}</DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="bg-black opacity-50 fixed top-0 left-0 right-0 bottom-0 grid place-items-center overflow-y-hidden" />
                <DialogPrimitive.Content className="modal bg-[#17171a] text-white flex flex-col gap-10 p-6 rounded-md">
                    <div className="flex justify-between">
                        <DialogPrimitive.Title className="font-bold">{title}</DialogPrimitive.Title>
                        <DialogPrimitive.Close aria-label="Close">
                            <XIcon className="text-[#646b80]" />
                        </DialogPrimitive.Close>
                    </div>
                    {content}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

export const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>((props, ref) => (
    <DialogPrimitive.Content {...props} ref={ref}>
        {props.children}
    </DialogPrimitive.Content>
));


DialogContent.displayName = 'DialogContent';
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;