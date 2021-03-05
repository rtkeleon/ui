import * as React from 'react';

import styled, { css } from 'styled-components';

import { Typography } from '../typography/Typography';

import { useTheme } from '../../hooks/useTheme';

import { MenuContext } from './MenuContext';

import { GlobalTheme } from '../../theme/types';

export interface MenuItemProps {
  /** className of the menu item */
  className?: string;

  /** If true, the menu item will be disabled */
  disabled?: boolean;

  /** Unique key used to distinguish menu items */
  itemKey: string | number;
}

interface ContainerProps {
  disabled?: boolean;
  isSelected: boolean;
  theme: GlobalTheme;
}

const Container = styled.div`
  ${({ disabled, theme, isSelected }: ContainerProps) => css<ContainerProps>`
    padding: ${theme.menuItemPadding};

    cursor: pointer;
    user-select: none;

    &:hover {
      .rtk-type-body {
        color: ${theme.menuItemHoverColor};
      }
      background: ${theme.menuItemHoverBackground};
    }

    ${isSelected &&
    css`
      .rtk-type-body {
        color: ${theme.menuItemHoverColor};
      }
    `}

    ${disabled &&
    css`
      cursor: default;
      pointer-events: none;
    `}
  `}
`;

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  className,
  children,
  disabled,
  itemKey,
}) => {
  const theme = useTheme();
  const { onClick, selectedItem } = React.useContext(MenuContext);

  const handleClick = React.useCallback(() => {
    if (onClick && !disabled) {
      onClick(itemKey);
    }
  }, [itemKey, disabled, onClick]);

  return (
    <Container
      className={`${className} rtk-menu-item`}
      key={itemKey}
      disabled={disabled}
      isSelected={selectedItem === itemKey}
      theme={theme}
      onClick={handleClick}
    >
      <Typography.Body disabled={disabled}>{children}</Typography.Body>
    </Container>
  );
};

MenuItem.displayName = 'MenuItem';
