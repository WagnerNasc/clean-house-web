import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const Title = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.50rem;
  }
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius:  6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input {
    border-radius: 6px;
    border: 0;
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme['gray-300']};
    padding: 1rem;

    &&::placeholder {
      color: ${props => props.theme["gray-500"]};
    }
  }

  button[type='submit'] {
    height: 58px;
    border: 0;
    background: ${props => props.theme['blue-500']};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${props => props.theme['blue-700']};
    }

  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-500']};

`

export const CustomersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  th {
    padding: 1.25rem 2rem;
    background: ${props => props.theme['gray-600']};

    &:first-child {
      border-top-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
    }
  }

  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme['gray-700']};

    &:first-child {
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-bottom-right-radius: 6px;
    }
  }

  td:nth-child(1),
  th:nth-child(1) {
    width: 30%;
  }

`