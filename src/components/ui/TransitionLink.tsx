import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { usePageTransition } from '../../context/TransitionContext';

interface TransitionLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  onAfterClick?: () => void;
}

export function TransitionLink({
  to,
  onClick,
  onAfterClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (onAfterClick) {
      onAfterClick();
    }

    // Allow cmd/ctrl/shift/middle click or external targets to behave natively
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    navigateTo(to);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
