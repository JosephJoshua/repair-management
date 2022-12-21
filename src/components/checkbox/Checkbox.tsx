import clsx from 'clsx';
import { FC, useRef } from 'react';
import {
  AriaCheckboxProps,
  mergeProps,
  useCheckbox,
  useFocusRing,
  usePress,
  VisuallyHidden,
} from 'react-aria';
import { useToggleState } from 'react-stately';

export type CheckboxProps = AriaCheckboxProps & {
  className?: string;
};

const Checkbox: FC<CheckboxProps> = (props: CheckboxProps) => {
  const isEditable = !props.isDisabled && !props.isReadOnly;

  const ref = useRef<HTMLInputElement>(null);
  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps } = usePress({ isDisabled: !isEditable });

  const disabledClasses = (() => {
    if (props.isDisabled && state.isSelected) return 'brightness-80';
    if (props.isDisabled) return 'border-2 border-gray-300 bg-gray-50';

    if (state.isSelected || isFocusVisible || props.isIndeterminate)
      return 'border-2 border-primary';

    return 'border-2 border-gray-500';
  })();

  return (
    <label
      className={`flex items-center gap-2 ${
        isEditable ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${props.className || ''}`}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>

      <div
        aria-hidden="true"
        className={clsx(
          state.isSelected ? 'bg-primary' : 'bg-white',
          isFocusVisible && 'ring-2 ring-primary/75 ring-offset-2',
          disabledClasses,
          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-white transition duration-200 ease-in-out'
        )}
        {...pressProps}
      >
        <svg className="h-3 w-3 stroke-current" viewBox="0 0 18 18">
          <rect
            x={0}
            y={7}
            width={props.isIndeterminate ? 18 : 0}
            height={5}
            className="fill-primary transition-all duration-100"
          />

          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            className="transition-all duration-300"
          />
        </svg>
      </div>

      <span
        className={`select-none ${props.isDisabled ? 'text-gray-500' : ''}`}
      >
        {props.children}
      </span>
    </label>
  );
};

export default Checkbox;
