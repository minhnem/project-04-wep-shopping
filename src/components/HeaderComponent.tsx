import { Layout } from 'antd'
import Link from 'next/link'
import React from 'react'

const {Header} = Layout

const HeaderComponent = () => {
  return (
    <Header>
        <Link href={'/auth/login'}>login</Link>
    </Header>
  )
}

export default HeaderComponent
