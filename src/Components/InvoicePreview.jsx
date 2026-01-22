export default function InvoicePreview({ invoice }) {
  const subtotal = invoice.items.reduce(
    (sum, i) => sum + i.qty * i.rate,
    0
  );
  const tax = (subtotal * invoice.taxRate) / 100;
  const total = subtotal + tax;

  return (
    <div id="invoice-preview" className="bg-white rounded-2xl shadow-xl p-8 space-y-8 print:shadow-none print:rounded-none">

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Invoice
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Invoice #{invoice.invoiceNumber || "—"}
          </p>
        </div>

        <div className="text-right text-sm text-slate-600">
          <p className="font-medium">Date</p>
          <p>{invoice.invoiceDate || "—"}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Bill To
        </p>
        <p className="text-slate-800 font-medium">
          {invoice.clientName || "Client Name"}
        </p>
        <p className="text-sm text-slate-600">
          {invoice.clientAddress || "Client Address"}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">
                Description
              </th>
              <th className="text-center px-4 py-3 font-semibold">
                Qty
              </th>
              <th className="text-right px-4 py-3 font-semibold">
                Rate/item
              </th>
              <th className="text-right px-4 py-3 font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-4 py-6 text-slate-400">
                  No items added
                </td>
              </tr>)}

            {invoice.items.map((i, idx) => (
              <tr
                key={idx}
                className="border-t border-slate-200">
                <td className="px-4 py-3 text-slate-800">
                  {i.desc || "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  {i.qty}
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{i.rate}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  ₹{i.qty * i.rate}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Tax ({invoice.taxRate}%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="border-t pt-3 flex justify-between text-lg font-bold text-slate-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
