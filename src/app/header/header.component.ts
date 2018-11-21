import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {MaterialService} from '../shared/classes/material.service';
import {HeaderAuthService} from '../shared/services/header-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit, AfterViewInit {

  public isFixed: boolean;
  @ViewChild('sidenav') sidenavRef: ElementRef;
  public user = [];

  constructor(@Inject(DOCUMENT) public document: Document,
              private headerAuthService: HeaderAuthService) {
  }

  ngOnInit() {
    this.headerAuthService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    MaterialService.initializeSidenav(this.sidenavRef);
  }

  @HostListener('window:scroll')
  private listener(): void {
    const scrollTop = this.document.documentElement.scrollTop;
    this.isFixed = scrollTop > 0;
  }

}
