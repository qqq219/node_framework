
import {LoadingOutlined} from '@ant-design/icons' 

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className='w-fit h-fit text-color-primary text-3xl'>
        <LoadingOutlined className='text-3xl text-color-primary' />
      </div>
    </div>
  )
}