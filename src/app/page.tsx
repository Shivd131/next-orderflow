'use client'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import SideNavbar from './components/SideNavbar';

export default function Home() {
  const customers = useSelector((state: RootState) => state.orders.orders.length);
  const stockItems = useSelector((state: RootState) => state.inventory.items.length);
  const pendingOrders = useSelector((state: RootState) =>
    state.orders.orders.filter(order => order.status === 'Pending').length);
  const outOfStockProducts = useSelector((state: RootState) =>
    state.inventory.items.filter(item => item.stock === 0).length);

  const summaryData = [
    { label: 'Total Customers', value: customers },
    { label: 'Total Stock Items', value: stockItems },
    { label: 'Total Pending Orders', value: pendingOrders },
    { label: 'Out of Stock Products', value: outOfStockProducts },
  ];

  return (
    <main className="">
      <div className='flex justify-between items-center bg-white px-3 py-4 border-b border-slate-300'>
        <div className='flex items-center gap-10 '>
          <h2 className='text-xl font-semibold'>Orders</h2>
        </div>
      </div>
      <div className='p-3'>
        <h2 className='font-semibold'>Summary</h2>
        <div className="grid grid-cols-2 gap-8 pt-10">
          {summaryData.map((item, index) => (
            <div key={index} className="flex justify-between py-6 rounded-md bg-white p-2 shadow-md hover:shadow-xl transition ease-in delay-50 duration-200 border border-slate-200">
              <p>{item.label}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
