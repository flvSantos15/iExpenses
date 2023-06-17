import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 0 0.75rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  // border-spacing: 0 0.5rem;
  // margin-top: 1.5rem;

  tbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  tr {
    display: flex;
    flex-direction: column;
  }

  td {
    // padding: 1.25rem 1rem;
    padding: 20px;
    background: ${(props) => props.theme['gray-700']};
    border-radius: 6px;

    div:first-child {
      display: flex;
      flex-direction: column;
      algin-items: flex-start;
      padding: 0px;
      gap: 4px;
    }

    div:last-child {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px;
      gap: 8px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
  font-family: 'Roboto_700Bold';
`

export const Description = styled.text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  line-height: 160%;

  color: #c4c4cc;
`

export const Category = styled.text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  line-height: 160%;

  color: #7c7c8a;
`

export const TransactionDate = styled.text`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  line-height: 160%;

  color: #7c7c8a;
`
