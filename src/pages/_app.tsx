import Header from "@/components/header";
import { AuthProvider } from "@/provider/auth";
import "@/styles/globals.scss";
import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer position={"bottom-right"} />
        <CssBaseline />
        <Header />
        <Container style={{ marginTop: "1.5rem" }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </AuthProvider>
  );
}
