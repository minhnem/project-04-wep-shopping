import { Button, Checkbox, Form, Input, message, Modal, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { use, useState } from 'react'
import bgAuth from '../../assets/images/auth-bg-1.svg'
import bgAuth2 from '../../assets/images/auth-bg-2.svg'
import logo from '../../assets/images/logo.svg'
import handleAPI from '@/api/handleAPI'
import { useDispatch } from 'react-redux'
import { addAuth } from '@/redux/reducers/authReducer'
import { useRouter } from 'next/router'

interface SignUP {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const {confirm} = Modal

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [signValue, setSignValue] = useState<SignUP>()

  const dispatch = useDispatch()

  const router = useRouter()

  const [form] = useForm()

  const handleSignUp = async (values: any) => {
    const data: any = {}
    if(isAgree) {
      for(const i in values) {
        data[i] = values[i] ?? ''
      }
      delete data.confirmPassword
      try {
        setIsLoading(true)
        const api = '/customer/create-customer'
        const res = await handleAPI(api, data, 'post')
        console.log(res.data)
        if(res.data) {
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
  }

  return (
    <div className='grid grid-cols-2 h-[100vh]'>
      <div style={{
        backgroundImage: `url(${bgAuth.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundPositionX: 'center'
      }}>
        <img className='m-8' src={logo.src}/>
      </div>

      <div className='flex items-center justify-center'>
        <div className='w-[50%]'>
          <Typography.Title level={2} style={{textAlign: 'center', marginBottom: '20px', fontWeight: '800'}}>Đăng ký</Typography.Title>
          <p className='text-center text-[1.2rem] font-medium mb-4'>Chào mừng bạn, hãy đăng ký tài khoản để đến với những sản phẩm tốt nhất.</p>
          <Form
            form={form}
            layout='vertical'
            size='large'
            onFinish={handleSignUp}
          >
            <Form.Item name='firstName' label='Nhập họ và tên:'>
              <Input placeholder='Nhập họ và tên' allowClear />
            </Form.Item>
            <Form.Item name='email' label='Nhập email:' rules={[{type: 'email', message: 'Email không hợp lệ!!'},{ required: true, message: 'Bạn chưa nhập email!!' }]}>
              <Input placeholder='Nhập email' allowClear />
            </Form.Item>
            <Form.Item name='password' label='Nhập mật khẩu:' rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!!' }]}>
              <Input.Password  placeholder='Nhập mật khẩu' allowClear />
            </Form.Item>
            <Form.Item 
            name='confirmPassword' 
            label='Nhập lại mật khẩu:'
            hasFeedback 
            rules={[
              {required: true, message: 'Bạn chưa nhập lại mật khẩu!!' },
              ({getFieldValue}) => ({
                validator(_,value) {
                  if(!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject('Mật khẩu không khớp!!')
                  }
                }
              })
            ]} 
            style={{marginBottom: '10px',}}>
              <Input.Password  placeholder='Nhập lại mật khẩu' allowClear />
            </Form.Item>
          </Form>
          <Checkbox 
            style={{fontWeight: '600',}} 
            onChange={() => setIsAgree(!isAgree)} 
            checked={isAgree}>Tôi đồng ý với Điều khoản & Điều kiện</Checkbox>
          <Button className='w-full mt-8 py-6' type='primary' size='large' onClick={() => {
            form.submit()
            if(!isAgree) {
              confirm({
                title: 'Thông báo',
                content: 'Bạn chưa đòng ý với Điều khoản & Điều kiện của chúng tôi!!!'
              })
            }
          }} loading={isLoading}>Đăng ký</Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
