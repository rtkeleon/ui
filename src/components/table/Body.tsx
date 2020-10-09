import * as React from 'react';

import styled, { css } from 'styled-components';

import { useTheme } from '../../hooks/useTheme';

import { Typography } from '../typography/Typography';

import { Cell } from './Cell';

import { ColumnProps, OnRowProps } from './Table';

import { GlobalTheme } from '../../theme/types';

interface BodyProps<T> {
  columns: ColumnProps<T>[];
  data: T[];
  dataUniqueKey: string | number;
  emptyComponent?: React.ReactNode;
  onRow?: OnRowProps<T>;
  selectedRowKey?: string | number;
}

const TD = styled.td<{
  theme: GlobalTheme;
}>`
  ${({ theme }) => css`
    border-bottom: ${theme.tableBodyRowBorder};
    border-color: ${theme.tableBodyRowBorderColor};
  `}
`;

const TR = styled.tr<{
  theme: GlobalTheme;
  selected: boolean;
}>`
  ${({ theme, selected }) => css`
    cursor: default;

    &:hover {
      ${!selected &&
        css<{ theme: GlobalTheme }>`
          background: ${theme.colors.hoverBackground};
        `}
    }

    ${selected &&
      css<{
        theme: GlobalTheme;
        selected: boolean;
      }>`
        background: ${theme.colors.quaternaryBackground};
      `};

    transition: background ${theme.animationTimeVeryFast}s ease-in-out;
  `}
`;

const EmptyContentContainer = styled.div`
  ${({ theme }) => css`
    height: ${theme.tableEmptyContainerHeight};

    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const Body = <T extends any>(props: BodyProps<T>) => {
  const {
    columns,
    data,
    dataUniqueKey,
    emptyComponent,
    onRow,
    selectedRowKey,
  } = props;

  const theme = useTheme();

  const handleClick = React.useCallback(
    (e, d) => {
      if (onRow && onRow.onClick) {
        onRow.onClick(e, d);
      }
    },
    [onRow]
  );

  const renderDataIndex = React.useCallback((column, data) => {
    if (column.dataIndex == null) {
      // eslint-disable-next-line no-console
      console.warn(
        `You must supply a dataIndex or render function for column: ${column.key}`
      );
      return null;
    } else {
      return data[column.dataIndex];
    }
  }, []);

  const renderBodyCell = React.useCallback(() => {
    if (data.length === 0) {
      return (
        <tr>
          <TD colSpan={columns.length}>
            <EmptyContentContainer theme={theme}>
              <Typography.Body>
                {emptyComponent == null ? 'No Data' : emptyComponent}
              </Typography.Body>
            </EmptyContentContainer>
          </TD>
        </tr>
      );
    }

    return data.map((d, index) => (
      <TR
        theme={theme}
        key={index}
        selected={selectedRowKey === d[dataUniqueKey]}
        onClick={e => handleClick(e, d)}
      >
        {columns.map(c => {
          const Renderer = c.render;
          return (
            <TD key={c.key} theme={theme}>
              <Cell justify={c.justify}>
                <Typography.Body>
                  {Renderer == null ? (
                    renderDataIndex(c, d)
                  ) : (
                    <Renderer record={d} />
                  )}
                </Typography.Body>
              </Cell>
            </TD>
          );
        })}
      </TR>
    ));
  }, [
    data,
    dataUniqueKey,
    columns,
    emptyComponent,
    renderDataIndex,
    theme,
    selectedRowKey,
    handleClick,
  ]);

  return <tbody>{renderBodyCell()}</tbody>;
};

Body.displayName = 'TableBody';
