import * as React from 'react';

import styled, { css } from 'styled-components';

import Header from './Header';

import {
  ContentContainer,
  Content,
  ContentBody,
  ContentFooter,
} from './Content';

import { useAfterMountEffect } from '../../hooks';

import { useTheme } from '../../hooks';

export interface CollapseProps {
  /** If true, collapse expand state will not be able to change when header is clicked */
  disabled?: boolean;

  /** If true, collapse will be expanded */
  expanded?: boolean;

  /** Icon to show on the right to show the current collapse state */
  icon?: React.ReactNode;

  /** Content to show in the collapse */
  children?: React.ReactNode;

  /** classname for the collapse */
  className?: string;

  /** Determines if collapse should default to expanded */
  defaultExpanded?: boolean;

  /** When Collapse closes the content component will be unmounted */
  destroyOnClose?: boolean;

  /** Content to render in the header */
  header?: React.ReactNode;

  /** Content to render in the footer */
  footer?: React.ReactNode;

  /** Unique key to identify collapse. Used for Accordion */
  itemKey?: string | number;

  /** Function to handle when collapse state changes */
  onChange?: (itemKey?: string | number) => void;

  /** if true, the footer hightlight will be permanent */
  permanentFooterHighlight?: boolean;

  /** if true, the header will be shown */
  showHeader?: boolean;
}

const Container = styled.div<{
  disabled?: boolean;
  showHeader?: boolean;
  permanentFooterHighlight?: boolean;
}>`
  ${({ disabled, theme, showHeader, permanentFooterHighlight }) => css<{
    disabled?: boolean;
    showHeader?: boolean;
  }>`

    ${!showHeader &&
      css`
        border-top: 1px solid ${theme.collapseBorderColor};
        border-top-left-radius: ${theme.collapseBorderRadius};
        border-top-right-radius: ${theme.collapseBorderRadius};
      `}
    
    ${disabled &&
      css`
        pointer-events: none;
      `}
    
    ${permanentFooterHighlight &&
      css`
        .rtk-collapse-content-footer {
          background: ${theme.collapseContentFooterHoverColor};
        }
      `}

    &:hover,
    :focus-within {
      .rtk-collapse-header {
        background: ${theme.collapseHeaderOpenBackground};
        border: 1px solid transparent;
        color: ${theme.collapseHeaderOpenColor};
      }
      .rtk-collapse-content-footer {
        background: ${theme.collapseContentFooterHoverColor};
      }
    }
  `};
  }
`;

export const Collapse: React.FunctionComponent<CollapseProps> = ({
  disabled,
  expanded,
  icon,
  className,
  children,
  defaultExpanded,
  destroyOnClose,
  header,
  footer,
  itemKey,
  onChange,
  permanentFooterHighlight,
  showHeader,
}) => {
  const [isExpanded, setExpanded] = React.useState<boolean | undefined>(
    defaultExpanded
  );

  const theme = useTheme();

  const onHeaderClick = React.useCallback(() => {
    // if external control of expanded state is not being used
    if (expanded === undefined) {
      setExpanded(!isExpanded);

      if (onChange) {
        onChange(itemKey);
      }
    } else if (onChange) {
      onChange(itemKey);
    }
  }, [expanded, isExpanded, itemKey, onChange]);

  // responsible for handling external control of the expanded state
  const handleSetExpanded = React.useCallback(() => {
    if (!disabled) {
      setExpanded(expanded);
    } else {
      setExpanded(false);
    }
  }, [disabled, expanded]);

  useAfterMountEffect(handleSetExpanded, [disabled, expanded]);

  const animate = React.useMemo(() => {
    if (isExpanded) {
      return 'open';
    }

    return 'closed';
  }, [isExpanded]);

  return (
    <Container
      className={`${className} rtk-collapse`}
      disabled={disabled}
      showHeader={showHeader}
      permanentFooterHighlight={permanentFooterHighlight}
      theme={theme}
    >
      {showHeader && (
        <Header
          disabled={disabled}
          expanded={isExpanded}
          icon={icon}
          onClick={onHeaderClick}
          theme={theme}
        >
          {header}
        </Header>
      )}
      <ContentContainer
        animate={animate}
        destroyOnClose={destroyOnClose}
        theme={theme}
      >
        <Content theme={theme} showHeader={showHeader} hasFooter={!!footer}>
          <ContentBody theme={theme} showHeader={showHeader}>
            {children}
          </ContentBody>
        </Content>
        {footer && <ContentFooter theme={theme}>{footer}</ContentFooter>}
      </ContentContainer>
    </Container>
  );
};

Collapse.displayName = 'Collapse';

Collapse.defaultProps = {
  disabled: false,
  expanded: undefined,
  children: '',
  className: '',
  defaultExpanded: false,
  destroyOnClose: false,
  header: '',
  showHeader: true,
  onChange: undefined,
  permanentFooterHighlight: false,
  itemKey: '',
};
