import { CustomerRouteButton, HeaderContainer, HeaderContent } from "./styles";
import logoImage from "../../assets/broom.png"
import * as Dialog from '@radix-ui/react-dialog'
import { OrderlyService } from "../OrderlyService";

export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <div>
          <img src={logoImage} alt=""/>
          <span> Clean House </span>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CustomerRouteButton>Rota de atendimento</CustomerRouteButton>
          </Dialog.Trigger>
          <OrderlyService/>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}