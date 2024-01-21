
import { CreateCustomerAddress } from "../CreateCustomerAddress";
import * as Dialog from '@radix-ui/react-dialog'
import { CreateCustomerButton, SearchCustomerForm } from "./styles";
import { debounce } from "lodash";
import { PlusCircle } from "phosphor-react";

interface SearchFormProps {
  onSearchChange: (value: string) => void;
}

export function SearchCustomer({ onSearchChange }: SearchFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const debouncedInputChange = debounce(handleInputChange, 500);

  return (
    <SearchCustomerForm>
      <input
        type="text"
        placeholder="Busque por clientes"
        onChange={debouncedInputChange}
      />

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <CreateCustomerButton>
            <PlusCircle size={24}/>Cadastrar Cliente
          </CreateCustomerButton>
        </Dialog.Trigger>
        <CreateCustomerAddress/>
      </Dialog.Root>
    
    </SearchCustomerForm>
  );
}