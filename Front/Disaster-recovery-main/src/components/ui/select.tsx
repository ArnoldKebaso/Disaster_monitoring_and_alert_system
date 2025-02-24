import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@radix-ui/react-icons';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`flex items-center justify-between p-2 border rounded-md ${className}`}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectContentProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={`bg-white border rounded-md shadow-lg ${className}`}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-2">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ className, children, ...props }, ref) => {
  // Validate value prop
  if (!props.value || typeof props.value !== 'string') {
    console.error('Select.Item must have a valid string value prop');
    return null;
  }

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={`flex items-center p-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto">
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

export const SelectSeparator = SelectPrimitive.Separator;
export const SelectScrollUpButton = SelectPrimitive.ScrollUpButton;
export const SelectScrollDownButton = SelectPrimitive.ScrollDownButton;

// Type exports for better TS support
export type SelectProps = SelectPrimitive.SelectProps;
export type SelectTriggerProps = SelectPrimitive.SelectTriggerProps;
export type SelectValueProps = SelectPrimitive.SelectValueProps;
export type SelectItemProps = SelectPrimitive.SelectItemProps;

export {
  SelectPrimitive as BaseSelect,
  CheckIcon as SelectCheckIcon,
  ChevronDownIcon as SelectChevronDownIcon,
  ChevronUpIcon as SelectChevronUpIcon
};