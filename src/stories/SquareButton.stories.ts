import Square from '@/component/MinesGame/Square';
import { SquareData, SquareStatus } from '@/interface/Board';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Board/Square',
  component: Square,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    'data': {control: 'object'}
  },
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;


const base: SquareData = {
  status: SquareStatus['未開啟'], value: 0, isMines: false
}
export const Primary: Story = {
  args: { data: base },
};
export const Number0: Story = {
  args: {
    data: {...base, status: SquareStatus['安全開啟']},
  },
};

export const Number1: Story = {
  args: {
    data: {...base, status: SquareStatus['安全開啟'], value: 1},
  },
};
export const Number2: Story = {
  args: {
    data: {...base, status: SquareStatus['安全開啟'], value: 2},
  },
};
export const Number3: Story = {
  args: {
    data: {...base, status: SquareStatus['安全開啟'], value: 3},
  },
};
export const Mark: Story = {
  args: {
    data: {...base, status: SquareStatus['標記旗子']},
  },
};
export const Mines: Story = {
  args: {
    data: {...base, status: SquareStatus['未標炸彈']},
  },
};
export const Dead: Story = {
  args: {
    data: {...base, status: SquareStatus['死亡']},
  },
};
export const ErrorMark: Story = {
  args: {
    data: {...base, status: SquareStatus['錯標旗子']},
  },
};

