import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";
import { FaSpinner } from "react-icons/fa6";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary" | "danger" | "ghost" | "tertiary";
  loading?: boolean;
  icon?: IconType;
  iconClassName?: string;
};

const Button = ({
  iconClassName,
  className,
  children,
  onClick,
  disabled,
  variant = "primary",
  type,
  loading = false,
  icon,
}: ButtonProps) => {
  const variantStyles = {
    primary:
      "bg-userMessage text-white hover:bg-[#0C8B66] disabled:bg-[#0C8B66]/50 dark:hover:bg-white/80",
    secondary:
      "bg-lightBackground text-textLight border border-inputBorder hover:bg-hover/10 dark:hover:bg-white/80 disabled:bg-lightBackground/50 disabled:text-textSecondary",
    danger: "bg-red text-white hover:bg-[#C53030] disabled:bg-[#C53030]/50",
    ghost: "bg-transparent text-textSecondary hover:bg-hover/20",
    tertiary:
      "bg-white text-darkbackground border border-inputBorder hover:bg-hover/10 dark:hover:bg-white/80 disabled:bg-lightBackground/50 disabled:text-textSecondary px-2 py-2 text-xs",
  };

  const buttonClass = variantStyles[variant] || variantStyles.primary;
  const Icon = icon;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-fit items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition duration-200",
        buttonClass,
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {loading ? (
        <FaSpinner className={cn("animate-spin text-lg", iconClassName)} />
      ) : Icon ? (
        <Icon className={cn("text-lg", iconClassName)} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
