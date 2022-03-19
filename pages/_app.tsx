import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { UserAuth } from "../components/login/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

type Props = {
  children: JSX.Element;
};

function AppInit({ children }: Props): JSX.Element {
  const isLoading = UserAuth();
  return isLoading ? <p>loading...</p> : children;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppInit>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppInit>
    </RecoilRoot>
  );
}

export default MyApp;
