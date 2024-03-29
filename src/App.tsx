import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Customers } from "./pages/Customers"
import { ToastContainer } from 'react-toastify';
import { CustomerProvider } from "./contexts/CustomerContext";

export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
        <CustomerProvider>
          <Customers/>
        </CustomerProvider>
        <ToastContainer />
    </ThemeProvider>
  )
}

