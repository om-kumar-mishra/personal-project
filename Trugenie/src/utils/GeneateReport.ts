import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toPng} from "html-to-image";

export const generateMultipagePDF = async (
  refs: any[],
  setPrintPDF: (b: boolean) => void
) => {
  if (refs.length === 0) {
    return;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < refs.length; index++) {
    const ref = refs[index];
    const dataUrl = await toPng(ref.current);

    const imgProps = pdf.getImageProperties(dataUrl);
    let pdfPageHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (pdfPageHeight > pdfHeight) {
      pdfPageHeight = pdfHeight;
    }

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfPageHeight);

    if (index < refs.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save("download.pdf");
  setTimeout(() => setPrintPDF(false), 2000);
};

export const generatePDF = (ref: any, setPrintPDF: (b: boolean) => void) => {
  if (ref.current) {
    toPng(ref.current).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //  if (pdfHeight >= height) {
      //   pdfHeight = height;
      // }
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
      setTimeout(() => setPrintPDF(false), 2000);
    });
  }
};
