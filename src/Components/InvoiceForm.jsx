export default function InvoiceForm({ invoice, setInvoice }) {
  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { desc: "", qty: 1, rate: 0 }], });
  };

  const updateItem = (i, field, value) => {
    const items = [...invoice.items];
    items[i][field] = value;
    setInvoice({ ...invoice, items });
  };

  const removeItem = (i) => {
    setInvoice({ ...invoice, items: invoice.items.filter((_, index) => index !== i), });
  };

  const inputBase =
    "w-full rounded-lg px-3 py-2 text-sm " + "border border-slate-300 " + "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Invoice Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Fill in the details below to generate an invoice
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Invoice Number
          </label>
          <input
            className={inputBase}
            placeholder="INV-001"
            onChange={(e) =>
              setInvoice({ ...invoice, invoiceNumber: e.target.value })} />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Invoice Date
          </label>
          <input
            type="date"
            className={inputBase}
            onChange={(e) =>
              setInvoice({ ...invoice, invoiceDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Client Name
          </label>
          <input
            className={inputBase}
            placeholder="Client name"
            onChange={(e) =>
              setInvoice({ ...invoice, clientName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Client Address
          </label>
          <input
            className={inputBase}
            placeholder="Client address"
            onChange={(e) =>
              setInvoice({ ...invoice, clientAddress: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-700">
            Items
          </h3>
          <span className="text-xs text-slate-400">
            Description · Qty · Rate
          </span>
        </div>

        {invoice.items.map((item, i) => (
          <div
            key={i}
            className=" grid grid-cols-[1fr_72px_96px_40px] gap-4 items-center rounded-2xl px-4 py-3 hover:bg-slate-100 transition "
          >
            <input
              className={inputBase}
              placeholder="Item description"
              onChange={(e) =>
                updateItem(i, "desc", e.target.value)
              }
            />

            <input
              type="number"
              className={inputBase + "text-center"}
              placeholder="Qty"
              onChange={(e) =>
                updateItem(i, "qty", +e.target.value)
              }
            />

            <input
              type="number"
              className={inputBase + "text-right"}
              placeholder="Rate"
              onChange={(e) =>
                updateItem(i, "rate", +e.target.value)
              }
            />

            <button
              onClick={() => removeItem(i)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-red-500 hover:bg-red-100 hover:text-red-600 transition"
              title="Remove item">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="  inline-flex items-center gap-2 border border-teal-600  text-teal-600  hover:bg-teal-50 px-5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer">
        + Add Item
      </button>
    </div>
  );
}
