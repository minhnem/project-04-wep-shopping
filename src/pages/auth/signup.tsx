import { Button, Checkbox, Form, Input, message, Modal, Space, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { use, useEffect, useRef, useState } from 'react'
import bgAuth from '../../assets/images/auth-bg-1.svg'
import bgAuth2 from '../../assets/images/auth-bg-2.svg'
import logo from '../../assets/images/logo.svg'
import handleAPI from '@/api/handleAPI'
import { useDispatch } from 'react-redux'
import { addAuth } from '@/redux/reducers/authReducer'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from 'next/link'

interface SignUP {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  code?: string
}

const { confirm } = Modal

const SignUp = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [signValue, setSignValue] = useState<SignUP>()
  const [verifyCode, setVerifyCode] = useState<string[]>([])
  const [time, setTime] = useState(60)
  const [startTime, setStartTime] = useState(false)

  const dispatch = useDispatch()

  const router = useRouter()

  const [form] = useForm()

  const inpRef1 = useRef<any>(null)
  const inpRef2 = useRef<any>(null)
  const inpRef3 = useRef<any>(null)
  const inpRef4 = useRef<any>(null)
  const inpRef5 = useRef<any>(null)
  const inpRef6 = useRef<any>(null)

  useEffect(() => {
    if (startTime === false || time === 0) {
      return
    }
    const interval = setInterval(() => {
      setTime((time) => {
        if (time <= 1) {
          clearInterval(interval)
          setStartTime(false)
          return 0
        }
        return time - 1
      })
    }, 1000);

    return () => clearInterval(interval)
  }, [startTime])

  const handleChangeCode = (val: string, index: number) => {
    const newCode = [...verifyCode]
    newCode[index] = val
    setVerifyCode(newCode)
  }

  const handleResendCode = async () => {
    try {
      setIsLoading(true)
      const api = '/customer/verify-code'
      await handleAPI(api, signValue, 'post')
      message.success('Gửi lại mã xác minh thành công.')
      setTime(60)
      setStartTime(true)
    } catch (error: any) {
      message.error(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    const item = verifyCode.filter((item) => item !== '')
    if (item.length < 6) {
      message.error('Mã xác minh của bạn không đúng!!')
    } else {
      let code = ''
      item.forEach(item => code += item)
      console.log(code.toUpperCase())
      try {
        setIsLoading(true)
        if (signValue) {
          signValue.code = code
        }
        const api = '/customer/create-customer'
        const res: any = await handleAPI(api, signValue, 'post')
        message.success(res.message)
        if(res.data) {
          dispatch(addAuth(res.data))
          localStorage.setItem('authCustomer', JSON.stringify(res.data))
          router.push('/')
        }
        console.log(res.data)
      } catch (error: any) {
        message.error(error.message)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSignUp = async (values: any) => {
    const data: any = {}
    if (isAgree) {
      for (const i in values) {
        data[i] = values[i] ?? ''
      }
      delete data.confirmPassword
      try {
        setIsLoading(true)
        const api = '/customer/verify-code'
        await handleAPI(api, data, 'post')
        message.success('Gửi mã xác minh thành công.')
        setSignValue(data)
        setTime(60)
        setStartTime(true)
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
        backgroundImage: `url(${signValue ? bgAuth2.src : bgAuth.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundPositionX: 'center'
      }}>
        <img className='m-8' src={logo.src} />
      </div>

      <div className='flex items-center justify-center'>
        {
          signValue ? (
            <div className='w-1/2'>
              <div className='mb-2'>
                <Button className='flex items-center gap-2 ml-[-18px]' type='text' onClick={() => setSignValue(undefined)}>
                  <IoMdArrowRoundBack size={20} />
                  Quay lại
                </Button>
              </div>
              <Typography.Title level={2} style={{ fontWeight: '800' }}>Nhập mã xác minh</Typography.Title>
              <Typography.Text>Chúng tôi đã gửi mã xác minh đến địa chỉ email của bạn, hãy kiểm tra và nhập mã xác minh.</Typography.Text>
              <div className='my-6 flex items-center justify-between'>
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef1}
                  onChange={(val) => {
                    handleChangeCode(val.target.value, 0)
                    if (val.target.value) {
                      inpRef2.current.focus()
                    }
                  }} />
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef2}
                  onChange={(val) => {
                    handleChangeCode(val.target.value, 1)
                    if (val.target.value) {
                      inpRef3.current.focus()
                    }
                  }} />
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef3}
                  onChange={(val) => {
                    handleChangeCode(val.target.value, 2)
                    if (val.target.value) {
                      inpRef4.current.focus()
                    }
                  }} />
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef4}
                  onChange={(val) => {
                    handleChangeCode(val.target.value, 3)
                    if (val.target.value) {
                      inpRef5.current.focus()
                    }
                  }} />
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef5}
                  onChange={(val) => {
                    handleChangeCode(val.target.value, 4)
                    if (val.target.value) {
                      inpRef6.current.focus()
                    }
                  }} />
                <Input
                  className='max-w-14 max-h-14 text-[30px] font-bold text-center'
                  maxLength={1}
                  ref={inpRef6}
                  onChange={(val) => handleChangeCode(val.target.value, 5)} />
              </div>
              <Button
                className='w-full mt-5'
                type='primary'
                size='large'
                onClick={() => handleVerifyCode()}
                loading={isLoading}
                disabled={time === 0 ? true : false}
              >
                Xác minh
              </Button>
              <div>
                {time === 0 ? (
                  <Button
                    className='w-full mt-5'
                    loading={isLoading}
                    type='primary'
                    size='large'
                    onClick={() => handleResendCode()}
                  >
                    Gửi lại mã xác minh
                  </Button>
                ) : (
                  <Typography.Title level={5} className='text-center mt-5'>Gửi lại mã xác minh sau {time} giây </Typography.Title>
                )}
              </div>
            </div>
          ) : (
            <div className='w-1/2'>
              <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '800' }}>Đăng ký</Typography.Title>
              <p className='text-center text-[1.2rem] font-medium mb-4'>Chào mừng bạn, hãy đăng ký tài khoản để đến với những sản phẩm tốt nhất.</p>
              <Form
                form={form}
                layout='vertical'
                size='large'
                onFinish={handleSignUp}
              >
                <Form.Item name='firstName' label='Nhập họ và tên:'>
                  <Input className='h-12' placeholder='Nhập họ và tên' allowClear />
                </Form.Item>
                <Form.Item name='email' label='Nhập email:' rules={[{ type: 'email', message: 'Email không hợp lệ!!' }, { required: true, message: 'Bạn chưa nhập email!!' }]}>
                  <Input className='h-12' placeholder='Nhập email' allowClear />
                </Form.Item>
                <Form.Item name='password' label='Nhập mật khẩu:' rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!!' }]}>
                  <Input.Password className='h-12' placeholder='Nhập mật khẩu' allowClear />
                </Form.Item>
                <Form.Item
                  name='confirmPassword'
                  label='Nhập lại mật khẩu:'
                  hasFeedback
                  rules={[
                    { required: true, message: 'Bạn chưa nhập lại mật khẩu!!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject('Mật khẩu không khớp!!')
                        }
                      }
                    })
                  ]}
                  style={{ marginBottom: '10px', }}>
                  <Input.Password className='h-12' placeholder='Nhập lại mật khẩu' allowClear />
                </Form.Item>
              </Form>
              <Checkbox
                style={{ fontWeight: '600', }}
                onChange={() => setIsAgree(!isAgree)}
                checked={isAgree}>Tôi đồng ý với Điều khoản & Điều kiện</Checkbox>
              <Button className='w-full mt-8 py-6' type='primary' size='large' onClick={() => {
                form.submit()
                if (!isAgree) {
                  confirm({
                    title: 'Thông báo',
                    content: 'Bạn chưa đòng ý với Điều khoản & Điều kiện của chúng tôi!!!'
                  })
                }
              }} loading={isLoading}>Đăng ký</Button>

              <div className='text-center mt-14'>
                <Space>
                  <Typography.Text style={{fontWeight: '600'}}>Bạn đã có tài khoản chưa? </Typography.Text>
                  <Link href={'/auth/login'} style={{fontWeight: '600', color: '#1677FF'}}>Đăng nhập</Link>
                </Space>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SignUp
