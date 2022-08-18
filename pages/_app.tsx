import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import UserContext from "../context"
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext>
    </ChakraProvider>
  )
}

export default MyApp
