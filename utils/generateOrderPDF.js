const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = ({ orderId, customer_name, mobile, address }) => {
  return new Promise((resolve) => {
    const fileName = `order_${orderId}.pdf`;
    const filePath = path.join(__dirname, "../public/pdfs", fileName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("Order Summary", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${orderId}`);
    doc.text(`Customer: ${customer_name}`);
    doc.text(`Mobile: ${mobile}`);
    doc.text(`Address: ${address}`);

    doc.end();

    resolve({
      filePath,
      fileName,
      publicUrl: `https://yourdomain.com/pdfs/${fileName}`,
    });
  });
};
