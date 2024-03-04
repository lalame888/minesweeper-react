import SettingRow from '@/component/SettingArea/SettingRow';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const meta = {
  title: 'Input/SettingRow',
  component: SettingRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, props) => {
      const [data, setData] = useState<number>(10); // 使用 useState 定義 value 的初始狀態
      // 定義點擊按鈕後的處理函數
      
      return(
        <div >
          <Story args={{...props.args, value: data, setValue: setData}}/>
          <span>父組件value = {data.toString()} </span>
          
        </div>
    )
  },
  ],
  
} satisfies Meta<typeof SettingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData = {
  value:10 , disabled: false, name: '標籤', max: 55
}
export const Primary: Story = {
  args: defaultData,
};