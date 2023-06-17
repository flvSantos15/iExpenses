import { Text } from 'react-native'
import * as Dialog from '@radix-ui/react-dialog'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import LogoImg from '../../assets/Logo.png'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <img src={LogoImg} alt="" />
          <Text>iExpenses</Text>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton className="transaction-button">
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
