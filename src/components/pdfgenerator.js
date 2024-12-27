import { FaEdit, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export  const generateAllProductsPDF = (products) => {
    const doc = new jsPDF();
    doc.setFontSize(15);
    doc.setTextColor('#003f7e');
    doc.text('TOP CLASS ESPRESSO', 120, 20);

    const tableColumns = ['Référence', 'Désignation', 'Date', 'État'];
    const tableRows = products.map((prod) => [
      prod.REFINV_0,
      prod.DESINV_0,
      new Date(prod.DATEINV_0).toLocaleDateString('fr-FR'),
      prod.ETATINV,
    ]);

    doc.autoTable({
      startY: 60,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: '#063970', textColor: '#ffffff' },
    });

    doc.save('produits.pdf');
  };
