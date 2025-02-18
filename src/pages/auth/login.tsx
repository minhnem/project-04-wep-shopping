import Link from 'next/link'
import React, { useState } from 'react'
import bgAuth2 from '../../assets/images/auth-bg-2.svg'
import logo from '../../assets/images/logo.svg'
import { Button, Checkbox, Form, Input, message, Modal, Space, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/router'
import handleAPI from '@/api/handleAPI'
import { useDispatch } from 'react-redux'
import { addAuth } from '@/redux/reducers/authReducer'

const login = () => {

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const router = useRouter()

  const [form] = useForm()

  const handleLogin = async (values: any) => {
    const data: any = {}
    for (const i in values) {
      data[i] = values[i] ?? ''
    }

    try {
      setIsLoading(true)
      const api = '/customer/login'
      const res: any = await handleAPI(api, data, 'post')
      if (res.data) {
        message.success(res.message)
        dispatch(addAuth(res.data))
        localStorage.setItem('authCustomer', JSON.stringify(res.data))
        router.push('/')
      }
    } catch (error: any) {
      message.error(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-2 h-[100vh]'>
      <div style={{
        backgroundImage: `url(${bgAuth2.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundPositionX: 'center'
      }}>
        <img className='m-8' src={logo.src} />
      </div>

      <div className='flex items-center justify-center'>
        <div className='w-1/2'>
          <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '800' }}>Đăng Nhập</Typography.Title>
          <p className='text-center text-[1.2rem] font-medium mb-4'>Chào mừng bạn, hãy đăng nhập tài khoản để đến với những sản phẩm tốt nhất.</p>
          <Form
            form={form}
            layout='vertical'
            size='large'
            onFinish={handleLogin}
          >
            <Form.Item name='email' label='Nhập email:' rules={[{ type: 'email', message: 'Email không hợp lệ!!' }, { required: true, message: 'Bạn chưa nhập email!!' }]}>
              <Input className='h-12' placeholder='Nhập email' allowClear />
            </Form.Item>
            <Form.Item name='password' label='Nhập mật khẩu:' rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!!' }]}>
              <Input.Password className='h-12' placeholder='Nhập mật khẩu' allowClear />
            </Form.Item>
          </Form>
          <div className='text-right'>
            <Link href={'/'} style={{ fontWeight: '600'}}>Quyên mật khẩu?</Link>
          </div>
          <Button
            className='w-full mt-8 py-6'
            type='primary'
            size='large'
            onClick={() => {
              form.submit()
            }}
            loading={isLoading}
          >
            Đăng nhập
          </Button>

          <div className='text-center mt-14'>
            <Space>
              <Typography.Text style={{ fontWeight: '600' }}>Bạn đã có tài khoản chưa? </Typography.Text>
              <Link href={'/auth/signup'} style={{ fontWeight: '600', color: '#1677FF' }}>Đăng Ký</Link>
            </Space>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
