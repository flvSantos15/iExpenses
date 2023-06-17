import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 0 0.75rem 10px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
  overflow-x: auto;
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Roboto_400Regular';
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-family: 'Roboto_700Bold';
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${(props) => props.theme['green-700']};
    `}
`
