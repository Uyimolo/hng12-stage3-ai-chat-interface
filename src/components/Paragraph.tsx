import { cn } from '@/lib/utils';
import { CSSProperties, ReactNode } from 'react';

type ParagraphProps = {
  variant?: 'base' | 'small';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

const Paragraph = ({
  className,
  onClick,
  style,
  children,
  variant = 'base',
}: ParagraphProps) => {
  return (
    <p
      className={cn(
        'text-gray dark:text-white',
        variant === 'small' ? 'text-xs' : 'text-sm',
        className
      )}
      onClick={onClick}
      style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
