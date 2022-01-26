import React from 'react';

enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  lite = 'lite',
}

interface ButtonProps {
  variant: string;
  icon?: JSX.Element;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { variant, icon, onClick, children } = props;
  const getVariantClass = () => {
    switch (variant) {
      case ButtonVariants.primary:
        return 'hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-gray-400 rounded shadow';
      case ButtonVariants.lite:
        return 'text-red group group-hover:text-red font-medium text-sm text-center mr-2 mb-2';
      default:
        return 'bg-gray-400 hover:bg-gray-500 text-white';
    }
  };

  return (
    <button
      className={`px-4 py-2 mr-2${getVariantClass()} inline-flex items-center`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
