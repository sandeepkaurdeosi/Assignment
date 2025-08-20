import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';

test('renders table with data', () => {
  const data = [{ id: 1, name: 'Sandeep' }];
  const columns = [{ key: 'name', title: 'Name', dataIndex: 'name' }];
  render(<DataTable data={data} columns={columns} />);
  expect(screen.getByText('Sandeep')).toBeInTheDocument();
});
