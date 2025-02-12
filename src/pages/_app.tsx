import store from "@/redux/store";
import Routers from "@/routers/Routers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#131118',
        fontFamily: 'Manrope, sans-serif',
        fontSize: 16
      }
    }}>
      <Routers Component={Component} pageProps={pageProps} />
    </ConfigProvider>
  </Provider>
}
