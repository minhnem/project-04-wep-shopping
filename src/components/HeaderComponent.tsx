import { authSelector, removeAuth } from '@/redux/reducers/authReducer'
import { Button, Layout } from 'antd'
import Link from 'next/link'
import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

const { Header } = Layout

const HeaderComponent = () => {

  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(removeAuth({}))
    localStorage.clear()
  }

  return (
    <Header className='bg-white'>
      <div className='text-right'>
        {
          auth.accesstoken ? (
            <Button type='text' danger icon={<BiPowerOff size={40} onClick={handleLogout}/>} />
          ) : (
            <Link href={'/auth/login'}>Login</Link>
          )
        }
      </div>
    </Header>
  )
}

export default HeaderComponent
