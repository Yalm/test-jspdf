const { jsPDF } = require("jspdf"); // will automatically load the node version
const fs = require("fs");
require("jspdf-autotable");

const pdf = new jsPDF();
const width = pdf.internal.pageSize.getWidth();
const height = pdf.internal.pageSize.getHeight();

pdf.addFileToVFS(
  "DejaVuSans.ttf",
  fs.readFileSync("./DejaVuSans.ttf", "base64")
);
pdf.addFileToVFS(
  "DejaVuSans-Bold.ttf",
  fs.readFileSync("./DejaVuSans-Bold.ttf", "base64")
);
pdf.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
pdf.addFont("DejaVuSans-Bold.ttf", "DejaVuSans", "bold");
pdf.setFont("DejaVuSans", "normal");
pdf.addImage(fs.readFileSync("./s.jpg", "base64"), 0, 0, width, height);
pdf.text("Hello world!", 10, 10);

pdf.setFontSize(12);

pdf.setTextColor("#0052cc");
pdf.textWithLink("www.google.com", 50, 80, { url: "http://www.google.com" });
pdf.setTextColor("#000000");
pdf.setLineWidth(0.5);
pdf.setDrawColor(0, 82, 204);
pdf.line(83, 80.5, 50, 80.5);

pdf.text("Hello world! asd asdasd asd", 94, 80);
pdf.text("hola es bold", 165, 80);
const margin = (width - 100) / 2;
pdf.autoTable({
  theme: "plain",
  styles: {
    fontSize: 8,
    lineWidth: 0.5,
    lineColor: [0, 0, 0],
  },
  body: [
    ["David", "david@example.com"],
    ["Castille", "castille@example.com"],
  ],
  margin: { left: margin, right: margin },
});

pdf.setFont("DejaVuSans", "bold");
pdf.text("hola es bold", 60, 90);

pdf.save("blob.pdf");
