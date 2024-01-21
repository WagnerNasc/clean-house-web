import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomerContextType {
  customerData: ApiResponse | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  fetchCustomerList: () => Promise<void>;
}

interface CustomerProviderProps {
  children: ReactNode;
}

interface ApiResponse {
  data: Customer[];
  total: number;
}

const CustomerContext = createContext({} as CustomerContextType);

export function CustomerProvider({ children }: CustomerProviderProps) {
  const [customerData, setCustomerData] = useState<ApiResponse>();
  const [searchValue, setSearchValue] = useState<string>("");

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
    <CustomerContext.Provider
      value={{ customerData, searchValue, setSearchValue, fetchCustomerList }}
    >
      {children}
    </CustomerContext.Provider>
  );
}