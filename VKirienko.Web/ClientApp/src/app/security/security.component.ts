import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityReportUrl } from './security-report-url';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit {
  reports: SecurityReportUrl[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.reports = [
      {
          name: 'DNSSEC Report',
          url: this.sanitizer.bypassSecurityTrustResourceUrl('https://zonemaster.net/result/0786de9e667c0b67') 
      },
      {
        name: 'Hardenize',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.hardenize.com/report/vkirienko.com')
      },
      {
        name: 'HSTS Preload Status',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://hstspreload.org/?domain=vkirienko.com')
      },
      {
        name: 'Internet.nl Report',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://en.internet.nl/site/vkirienko.com/')
      },
      {
        name: 'SecurityHeaders.io',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://securityheaders.com/?q=https%3A%2F%2Fvkirienko.com%2F')
      },
      {
        name: 'SSL Labs Report',
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.ssllabs.com/ssltest/analyze.html?d=vkirienko.com&latest')
      }
    ];
  }
}
