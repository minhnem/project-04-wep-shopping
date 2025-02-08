import HeaderComponent from '@/components/HeaderComponent'
import { Layout } from 'antd'
import { usePathname } from 'next/navigation'
import React from 'react'

const {Content, Footer} = Layout

const Routers = ({ Component, pageProps }: any) => {

  const path = usePathname()

  return (
    <>{path && path.includes('/auth') ? (<Layout>
        <Content>
            <Component pageProps={pageProps} />
        </Content>
    </Layout>) : (<Layout>
        <HeaderComponent/>
        <Content>
            <Component pageProps={pageProps} />
        </Content>
        <Footer/>
    </Layout>)
    }</>
  )
}

export default Routers
