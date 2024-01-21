import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, CustomersTable, Overlay, Title } from './styles'
import { useEffect, useState } from 'react';
import { X, CarSimple } from 'phosphor-react';

interface CustomerAddress {
  id: string
  name: string
  email: string
  phone: string
  street: string
  number: string
  neighborhood: string
  city: string
}


export function OrderlyService() {
  const [customerData, setCustomerData] = useState<CustomerAddress[] | []>();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/customer-addresses");
      const data = await response.json();
      setCustomerData(data);
    } catch (error) {
      console.error("Error fetching customer addresses data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <Dialog.Portal>
      <Overlay/>

      <Content>
        <Title>
          <CarSimple size={24}/> Ordem de Atendimento
        </Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>
        <CustomersTable>
          <table>
            <thead>
              <th key="name">Nome</th>
              <th key="phone">Telefone</th>
              <th key="email">Email</th>
              <th key="street">Logradouro</th>
              <th key="number">Numero</th>
              <th key="neighborhood">Bairro</th>
              <th key="city">Cidade</th>
            </thead>
            <tbody>
              {customerData?.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.street}</td>
                  <td>{customer.number}</td>
                  <td>{customer.neighborhood}</td>
                  <td>{customer.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CustomersTable>
      </Content>
    </Dialog.Portal>
  )
}