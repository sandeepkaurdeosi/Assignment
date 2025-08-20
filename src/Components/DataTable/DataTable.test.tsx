import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable, type Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Sandeep', email: 'sandeep@example.com', age: 22 },
  { id: 2, name: 'Diksha', email: 'diksha@example.com', age: 23 },
];

test('renders table with data', () => {
  render(<DataTable<User> data={data} columns={columns} />);
  expect(screen.getByText('Sandeep')).toBeInTheDocument();
  expect(screen.getByText('Diksha')).toBeInTheDocument();
});

test('renders empty state', () => {
  render(<DataTable<User> data={[]} columns={columns} />);
  expect(screen.getByText('No data available.')).toBeInTheDocument();
});

test('select row when selectable is true', () => {
  render(<DataTable<User> data={data} columns={columns} selectable />);
  const checkbox = screen.getAllByRole('checkbox')[0];
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

