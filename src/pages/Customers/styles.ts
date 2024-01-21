import styled from "styled-components";

export const CustomersContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const CustomersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

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

  td:nth-child(1),
  th:nth-child(1) {
    width: 50%;
  }

  td:nth-last-child(1),
  th:nth-last-child(1) {
    width: 33%;
  }
`;

export const EmptyTableMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 1.2rem;

  p {
    text-align: center;
    font: 1.2rem "Roboto", sans-serif
  }
` 
