import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  createCustomer: (data: CustomerFormData) => Promise<void>;
}

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}


interface CustomerProviderProps {
  children: ReactNode;
}

interface ApiResponse {
  data: Customer[];
  total: number;
}

export const CustomersContext = createContext({} as CustomerContextType);

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

  const createCustomer = async (data: CustomerFormData) => {
    try {   
      const response = await fetch("http://localhost:3000/customer-address", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        toast.error("O e-mail ja existe.");
        console.error("Email already exists");
        return;
      }

      const  { id, name, email, phone } = await response.json();
      const customer: Customer = { id, name, email, phone }

      setCustomerData((state) => {
        return {
          data: [customer,...(state?.data || []), ],
          total: (state?.total || 0) + 1,
        };
      });

    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Erro ao criar cliente. Tente novamente.");
    }
  }

  return (
    <CustomersContext.Provider
      value={{ customerData, searchValue, setSearchValue, fetchCustomerList, createCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
}