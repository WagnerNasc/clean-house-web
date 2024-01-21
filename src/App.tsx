import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Customers } from "./pages/Customers"

export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
        <Customers/>
    </ThemeProvider>
  )
}

