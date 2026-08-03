import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const OrdersPage = () => (
  <ProtectedRoute>
    <Layout>
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Orders</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Order history</h1>

        <div className="mt-8 space-y-3">
          {[
            { item: 'Protein Harvest Bowl', status: 'Delivered', amount: '$18' },
            { item: 'Mood Balance Snack Box', status: 'In transit', amount: '$22' },
            { item: 'Green Glow Smoothie', status: 'Delivered', amount: '$11' },
          ].map((order) => (
            <div key={order.item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{order.item}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{order.status}</div>
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{order.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  </ProtectedRoute>
);

export default OrdersPage;
