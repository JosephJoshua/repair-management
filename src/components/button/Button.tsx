import clsx from 'clsx';
import { FC, useRef } from 'react';
import {
  AriaButtonProps,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
} from 'react-aria';

export type ButtonProps = AriaButtonProps<'button'> & {
  className?: string;
  variant?: 'default' | 'outlined' | 'flat' | 'icon';
};

const Button: FC<ButtonProps> = ({
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  const { hoverProps, isHovered } = useHover({ isDisabled: props.isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  const variantClasses = (() => {
    switch (variant) {
      case 'flat':
        return clsx(
          'bg-transparent text-primary',
          isHovered && 'bg-primary/10',
          isPressed && 'bg-primary/20'
        );

      case 'outlined':
        return 'bg-transparent text-primary border-2 border-primary';

      case 'default':
      case 'icon':
      default:
        return 'bg-primary text-white';
    }
  })();

  return (
    <button
      className={clsx(
        isHovered && '-translate-y-px',
        isFocusVisible && 'ring-2 ring-primary/75',
        variant !== 'flat' && [
          isHovered || isPressed ? 'shadow-md' : 'shadow-xxs',
          isFocusVisible && 'ring-offset-2',
        ],
        variantClasses,
        className,
        'bg-150 bg-x-25 active:opacity-85 inline-block cursor-pointer rounded-lg px-6 py-3 text-center align-middle text-sm font-medium leading-normal outline-none transition-all ease-in'
      )}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
    >
      {children}
    </button>
  );
};

export default Button;
