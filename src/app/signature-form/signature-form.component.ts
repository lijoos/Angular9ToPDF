import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import html2canvas from 'html2canvas';
declare let jsPDF;
@Component({
  selector: 'app-signature-form',
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.sass']
})
export class SignatureFormComponent implements OnInit, AfterViewInit {

  @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;
  subBtnDisable = true;
  public signaturePadOptions: Object = {
    'minWidth': 1,
    'canvasWidth': 200,
    'canvasHeight': 80
  };
  public customerName: string;
  public phoneNumber: number;
  public printElement: any;
  public pdfData: any;
  public imageHeight: any;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.clear();
  }

  numberOnly(event) {
    // const charCode = (event.which) ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false;
    // }
    // return true;
  }

  generatePdf() {
    const filename = 'upsellingForm.pdf';
    const thisData = this;
    this.printElement = document.getElementById('content');

    const htmlWidth = this.printElement.offsetWidth;
    const htmlHeight = this.printElement.offsetHeight;
    const topLeftMargin = 15;
    const pdfWidth = htmlWidth + (topLeftMargin * 2);
    const pdfheight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    const canvasImageWidth = htmlWidth;
    const canvasImageHeight = htmlHeight;
    const totalPDFPages = Math.ceil(htmlHeight / pdfheight) - 1;

    html2canvas(this.printElement, { scrollY: -window.scrollY }).then(canvas => {
      canvas.getContext('2d');
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      this.pdfData = new jsPDF('p', 'pt', [pdfWidth, pdfheight]);
      this.pdfData.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
      for (let i = 1; i <= totalPDFPages; i++) {
        this.pdfData.addPage(pdfWidth, pdfheight);
        this.pdfData.addImage(imgData, 'JPG', topLeftMargin, -(pdfheight * i) +
        (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
      }
      this.pdfData.save(filename);
      this.uploadFile(this.pdfData.output('blob'), filename);
    });
    // this.uploadFile(this.pdfData.output('blob'), filename);
  }
  uploadFile(pdfFile: Blob, fileName: string) {
    // call back end servic here
    // const url = this.salesFormUploadUrl;
    // const headers = new HttpHeaders({'X-POLICY-NO': policyNumber, 'TOKEN': token});
    // const formData: FormData = new FormData();
    // formData.append('file', file, fileName);
    // const res = this.httpClient.post<any>(url, formData, { headers: headers, responseType: 'json'});
    // return res;
  }
}
