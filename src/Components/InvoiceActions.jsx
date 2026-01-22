import jsPDF from "jspdf";

export default function InvoiceActions({ invoice }) {
  if (!invoice) return null;

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    let y = 20;

    pdf.setFontSize(20);
    pdf.text("Invoice", 20, y);

    pdf.setFontSize(11);
    pdf.text(`Invoice #: ${invoice.invoiceNumber || "-"}`, pageWidth - 20, y, { align: "right" } );

    y += 6;
    pdf.text(`Date: ${invoice.invoiceDate || "-"}`, pageWidth - 20, y, { align: "right" } );

    y += 10;
    pdf.setDrawColor(200);
    pdf.line(20, y, pageWidth - 20, y);

    y += 10;
    pdf.setFontSize(12);
    pdf.text("Bill To", 20, y);

    y += 6;
    pdf.setFontSize(11);
    pdf.text(invoice.clientName || "Client Name", 20, y);

    y += 5;
    pdf.setTextColor(90);
    pdf.text(invoice.clientAddress || "Client Address", 20, y);
    pdf.setTextColor(0);

    y += 14;

    pdf.setDrawColor(220);
    pdf.line(20, y, pageWidth - 20, y);

    y += 6;
    pdf.setFontSize(11);
    pdf.text("Description", 20, y);
    pdf.text("Qty", 120, y);
    pdf.text("Rate/item", 145, y);
    pdf.text("Amount", pageWidth - 20, y, { align: "right" });

    y += 4;
    pdf.setDrawColor(220);
    pdf.line(20, y, pageWidth - 20, y);

    let subtotal = 0;

    invoice.items.forEach((item) => {
      const amount = item.qty * item.rate;
      subtotal += amount;

      y += 8;

      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      pdf.setFontSize(11);
      pdf.text(item.desc || "-", 20, y);
      pdf.text(String(item.qty), 120, y);
      pdf.text(`Rs. ${item.rate}`, 145, y);
      pdf.text(`Rs. ${amount}`, pageWidth - 20, y, {
        align: "right",
      });
    });

    const tax = (subtotal * invoice.taxRate) / 100;
    const total = subtotal + tax;

    y += 14;

    pdf.setDrawColor(180);
    pdf.line(110, y, pageWidth - 20, y);

    y += 8;
    pdf.setFontSize(11);
    pdf.text("Subtotal", 140, y);
    pdf.text(`Rs. ${subtotal}`, pageWidth - 20, y, {
      align: "right",
    });

    y += 6;
    pdf.text(`Tax (${invoice.taxRate}%)`, 140, y);
    pdf.text(`Rs. ${tax}`, pageWidth - 20, y, {
      align: "right",
    });

    y += 8;
    pdf.setFontSize(13);
    pdf.text("Total", 140, y);
    pdf.text(`Rs. ${total}`, pageWidth - 20, y, {
      align: "right",
    });

    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text(
      "Thank you for your business",
      pageWidth / 2,
      290,
      { align: "center" }
    );

    pdf.save(`invoice-${Date.now()}.pdf`);
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={downloadPDF}  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium  shadow-lg  hover:bg-emerald-700 transition cursor-pointer">
        Download Invoice PDF
      </button>
    </div>
  );
}
