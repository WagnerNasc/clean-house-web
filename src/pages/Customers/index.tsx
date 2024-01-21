import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { CustomersContainer, CustomersTable, EmptyTableMessage } from "./styles";
import { SearchCustomer } from "../../components/SearchCustomer";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  data: Customer[];
  total: number;
}

export function Customers() {
  const [customerData, setCustomerData] = useState<ApiResponse>();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (data: string) => {
    setSearchValue(data);
  };

  const fetchCustomerList = async () => {
    try {
      const url = searchValue
        ? `http://localhost:3000/customers?filter=${searchValue}`
        : "http://localhost:3000/customers";

      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      setCustomerData(data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, [searchValue]);

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