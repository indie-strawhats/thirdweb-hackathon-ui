import React from 'react';

enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
}

const Button = ({ children, variant, onClick }: any) => {
  const getVariantClass = () => {
    switch (variant) {
      case ButtonVariants.primary:
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-gray-400 hover:bg-gray-500 text-white';
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg  mr-2 ${getVariantClass()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
