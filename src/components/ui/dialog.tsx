'use client';

// shadcn/ui Radix Dialog composition, adapted to StudioSpace's CSS theme.
// Reference: https://ui.shadcn.com/docs/components/radix/dialog
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({children, className='', ...props}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay data-slot="dialog-overlay" className="modal-overlay"/>
    <DialogPrimitive.Content data-slot="dialog-content" className={`modal ${className}`} {...props}>
      {children}
      <DialogPrimitive.Close className="icon-button dialog-close" aria-label="Close dialog"><X size={20}/></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>;
}
export function DialogHeader({className='',...props}:React.ComponentProps<'div'>){return <div data-slot="dialog-header" className={`modal-heading ${className}`} {...props}/>;}
export function DialogFooter({className='',...props}:React.ComponentProps<'div'>){return <div data-slot="dialog-footer" className={`modal-actions ${className}`} {...props}/>;}
