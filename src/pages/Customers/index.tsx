import { useContext } from "react";
import { Header } from "../../components/Header";
import { CustomersContainer, CustomersTable, EmptyTableMessage } from "./styles";
import { SearchCustomer } from "../../components/SearchCustomer";
import { CustomersContext } from "../../contexts/CustomerContext";

export function Customers() {
  const { customerData, setSearchValue } = useContext(CustomersContext);

  const handleSearchChange = (data: string) => {
    setSearchValue(data);
  };

  return (
    <div>
      <Header />

      <CustomersContainer>
        <SearchCustomer onSearchChange={handleSearchChange} />
        {(customerData?.data && customerData?.data.length > 0 ? (
          <CustomersTable>
            <table>
              <thead>
                <tr>
                  <th key="name">Nome</th>
                  <th key="email">Email</th>
                  <th key="phone">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {customerData.data.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </CustomersTable>
          ) : (
            <EmptyTableMessage>
              <p>Nenhum cliente foi encontrado!</p>
            </EmptyTableMessage>
          ))}
      </CustomersContainer>
    </div>
  );
}