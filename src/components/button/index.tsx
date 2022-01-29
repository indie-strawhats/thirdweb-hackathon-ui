import React from 'react';

enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  ghost = 'ghost',
}

interface ButtonProps {
  variant: string;
  icon?: JSX.Element;
  onClick?: () => void;
  children: React.ReactNode | string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { variant, icon, onClick, children, className } = props;
  const getVariantClass = () => {
    switch (variant) {
      case ButtonVariants.ghost:
        return 'px-4 py-2 text-m font-semibold text-center text-gray-800 hover:text-indigo-500';
      case ButtonVariants.primary:
        return 'px-4 py-2 text-m font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-indigo-500 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:text-indigo-500';
      default:
        return 'text-white bg-gray-400 hover:bg-gray-500';
    }
  };

  return (
    <button
      className={`inline-flex items-center text-m ${getVariantClass()} ${className}`}
      onClick={onClick}
    >
      <>
        {icon}
        {children}
      </>
    </button>
  );
};

export default Button;
