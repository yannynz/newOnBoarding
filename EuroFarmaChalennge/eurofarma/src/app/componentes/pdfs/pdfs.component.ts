import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Pdf {
  id: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent implements OnInit {
  pdfs: Pdf[] = [];
  selectedPdf: Pdf | null = null;
  selectedPdfUrl: SafeResourceUrl | null = null;
  role: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadPdfsBasedOnRole();
  }

  loadPdfsBasedOnRole() {
    this.role = localStorage.getItem('userRole');
    console.log('User Role:', this.role);

    switch (this.role) {
      case 'ti':
        this.pdfs = [
          { id: 'pdf1', title: 'TI PDF 1', url: 'assets/pdfs/ti1.pdf' },
          { id: 'pdf2', title: 'TI PDF 2', url: 'assets/pdfs/ti2.pdf' },
          { id: 'pdf3', title: 'TI PDF 3', url: 'assets/pdfs/ti3.pdf' },
          { id: 'pdf4', title: 'TI PDF 4', url: 'assets/pdfs/ti4.pdf' }
        ];
        break;
      case 'admin':
        this.pdfs = [
          { id: 'pdf1', title: 'Admin PDF 1', url: 'assets/pdfs/admin1.pdf' },
          { id: 'pdf2', title: 'Admin PDF 2', url: 'assets/pdfs/admin2.pdf' },
          { id: 'pdf3', title: 'Admin PDF 3', url: 'assets/pdfs/admin3.pdf' },
          { id: 'pdf4', title: 'Admin PDF 4', url: 'assets/pdfs/admin4.pdf' }
        ];
        break;
      case 'financeiro':
        this.pdfs = [
          { id: 'pdf1', title: 'Financeiro PDF 1', url: 'assets/pdfs/financeiro1.pdf' },
          { id: 'pdf2', title: 'Financeiro PDF 2', url: 'assets/pdfs/financeiro2.pdf' },
          { id: 'pdf3', title: 'Financeiro PDF 3', url: 'assets/pdfs/financeiro3.pdf' },
          { id: 'pdf4', title: 'Financeiro PDF 4', url: 'assets/pdfs/financeiro4.pdf' }
        ];
        break;
      default:
        console.log('Nenhum PDF encontrado para a role:', this.role);
        this.pdfs = [];
    }

    if (this.pdfs.length > 0) {
      this.selectedPdf = this.pdfs[0]; // Seleciona o primeiro PDF como padrão
      this.selectedPdfUrl = this.getSafeUrl(this.selectedPdf.url);
    }
  }

  selectPdf(pdf: Pdf) {
    this.selectedPdf = pdf;
    this.selectedPdfUrl = this.getSafeUrl(pdf.url);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadPdf(url: string) {
    const link = document.createElement('a'); // Cria um elemento <a>
    link.href = url; // Define o link para o URL do PDF
    link.download = url.substring(url.lastIndexOf('/') + 1); // Define o nome do arquivo para download
    link.click(); // Simula o clique no link para iniciar o download
  }

}
