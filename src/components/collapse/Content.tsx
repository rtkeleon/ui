import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import styled, { css } from 'styled-components';

import { GlobalTheme } from '../../theme/types';

interface ContentContainerProps {
  animate: 'open' | 'closed';
  destroyOnClose?: boolean;
  theme: any;
}

const variants = {
  closed: {
    height: 0,
  },
  open: {
    height: 'auto',
  },
};

export const ContentContainer: React.FunctionComponent<ContentContainerProps> = ({
  animate,
  children,
  destroyOnClose,
  theme,
}) => {
  const content = (
    <motion.div
      key="content"
      style={{
        overflow: 'hidden',
      }}
      layout
      initial="closed"
      exit="closed"
      animate={animate}
      variants={variants}
      transition={{ duration: theme.animationTimeVeryFast, type: 'tween' }}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence initial={false}>
      {destroyOnClose ? animate === 'open' && content : content}
    </AnimatePresence>
  );
};

interface ContentBodyProps {
  theme: GlobalTheme;
  showHeader?: boolean;
}

const StyledContentBody = styled(motion.div)<ContentBodyProps>`
  ${({ theme, showHeader }) => css<ContentBodyProps>`
    padding: ${theme.collapseContentPadding};
    background: ${theme.collapseContentBackground};
    border-radius: 0 0 ${theme.collapseBorderRadius}
      ${theme.collapseBorderRadius};

    ${!showHeader &&
      css`
        border-radius: ${theme.collapseBorderRadius}
          ${theme.collapseBorderRadius} 0 0;
      `}
  `};
`;

export const ContentBody: React.FunctionComponent<ContentBodyProps> = props => {
  const { children, theme } = props;

  return (
    <StyledContentBody
      layout
      transition={{ duration: theme.animationTimeVeryFast }}
      className={'rtk-collapse-content-body'}
      {...props}
    >
      {children}
    </StyledContentBody>
  );
};

ContentBody.displayName = 'CollapseContentBody';

interface ContentFooterProps {
  theme: GlobalTheme;
}

const StyledFooter = styled.div<ContentFooterProps>`
  ${({ theme }) => css<ContentFooterProps>`
    background: ${theme.collapseContentBackground};
    padding: ${theme.collapseContentPadding};
    border-radius: 0 0 ${theme.collapseBorderRadius}
      ${theme.collapseBorderRadius};
    border: 1px solid ${theme.collapseBorderColor};

    border-top: 0;
  `};
`;

export const ContentFooter: React.FunctionComponent<ContentFooterProps> = props => {
  const { children } = props;

  return (
    <StyledFooter className={'rtk-collapse-content-footer'} {...props}>
      {children}
    </StyledFooter>
  );
};

ContentFooter.displayName = 'CollapseContentFooter';

interface ContentProps {
  theme: GlobalTheme;
  hasFooter?: boolean;
  showHeader?: boolean;
}

const StyledContent = styled(motion.div)<ContentProps>`
  ${({ theme, showHeader, hasFooter }) => css<ContentProps>`
    background: ${theme.collapseContentBackground};
    border: ${theme.collapseBorder};
    border-color: ${theme.collapseBorderColor};
    border-radius: ${theme.collapseBorderRadius};

    border-top: none;

    ${(!showHeader || hasFooter) &&
      css`
        border-radius: ${theme.collapseBorderRadius}
          ${theme.collapseBorderRadius} 0 0;
      `}
  `};
`;

export const Content: React.FunctionComponent<ContentProps> = props => {
  const { children, theme } = props;

  return (
    <StyledContent
      layout
      transition={{ duration: theme.animationTimeVeryFast }}
      className={'rtk-collapse-content'}
      {...props}
    >
      {children}
    </StyledContent>
  );
};

Content.displayName = 'CollapseContent';
