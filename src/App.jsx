import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import InvoiceActions from "./components/InvoiceActions";

export default function App() {
  const [invoice, setInvoice] = useState({
    clientName: "",
    clientAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    taxRate: 18,
    items: [],
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Invoice Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        <InvoicePreview invoice={invoice} />
      </div>
      <InvoiceActions invoice={invoice} />
      
    </div>
  );
}
