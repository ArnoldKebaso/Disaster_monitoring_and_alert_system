import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  component?: React.ElementType;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  component,
  to,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };
  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // If `to` is provided, use `Link` from react-router-dom
  if (to) {
    const LinkComponent = component || Link;
    return (
      <LinkComponent to={to} className={buttonClasses} {...props}>
        {children}
      </LinkComponent>
    );
  }

  // Otherwise, render a regular button
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};