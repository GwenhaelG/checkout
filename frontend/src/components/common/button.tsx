import React, { ReactNode } from 'react';
import styled from 'styled-components';

const SButton = styled.button<PrimaryButtonProps>`
  min-width: fit-content;
  width: 100%;
  max-width: 30vw;
  margin-left: 5px;
  margin-right: 5px;
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.button.disabled.background.default
      : theme.button.active.background.default};
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.button.disabled.font.default
      : theme.button.active.font.default};
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.button.hover.background.default};
    color: ${({ theme }) => theme.button.hover.font.default};
    border: 1px solid ${({ theme }) => theme.button.hover.font.default};
  }
`;

interface PrimaryButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  title?: string;
  callback?: () => void;
  disabled?: boolean;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  render?: ReactNode;
}

const PrimaryButton = ({
  title = 'Button',
  disabled = false,
  callback = () => {},
  color,
  render,
  ...props
}: PrimaryButtonProps) => {
  return render ? (
    <SButton disabled={disabled} onClick={callback} {...props}>
      {render}
    </SButton>
  ) : (
    <SButton disabled={disabled} onClick={callback} {...props}>
      <p style={{ marginTop: 'auto', marginBottom: 'auto' }}>{title}</p>
    </SButton>
  );
};

export default PrimaryButton;
