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
}

const Button = (props: ButtonProps) => {
  const { variant, icon, onClick, children } = props;
  const getVariantClass = () => {
    switch (variant) {
      case ButtonVariants.primary:
        return 'px-4 py-2 font-semibold text-gray-800 border-gray-400 rounded shadow hover:bg-gray-100 hover:text-yellow-500';
      case ButtonVariants.ghost:
        return 'mb-2 mr-2 text-sm font-semibold text-center text-gray-800 hover:text-yellow-500';
      default:
        return 'text-white bg-gray-400 hover:bg-gray-500';
    }
  };

  return (
    <button
      className={`px-4 py-2 mr-2 ${getVariantClass()} inline-flex items-center `}
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
