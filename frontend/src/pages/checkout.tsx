import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const CheckoutPage = () => (
  <ProtectedRoute>
    <Layout>
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Finalize your order</h1>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">Protein Harvest Bowl</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Delivery • 30 min</div>
            </div>
            <div className="text-lg font-black text-slate-900 dark:text-white">$18</div>
          </div>
        </div>

        <button type="button" className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white">
          Complete checkout
        </button>
      </div>
    </Layout>
  </ProtectedRoute>
);

export default CheckoutPage;
