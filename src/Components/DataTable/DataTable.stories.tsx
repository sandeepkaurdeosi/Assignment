import React from 'react';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { DataTable, type DataTableProps } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: 'Sandeep', email: 'sandeep@example.com', age: 22 },
  { id: 2, name: 'Diksha', email: 'diksha@example.com', age: 23 },
  { id: 3, name: 'Aman', email: 'aman@example.com', age: 25 },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

export default {
  title: 'Components/DataTable',
  component: DataTable,
} as Meta<DataTableProps<User>>;


const Template: StoryFn<DataTableProps<User>> = (args) => <DataTable<User> {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  columns,
  selectable: true,
  loading: false,
};

