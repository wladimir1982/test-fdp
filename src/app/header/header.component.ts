import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  constructor(private headerAuthService: HeaderAuthService) {
  }

  ngOnInit() {
    this.headerAuthService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    MaterialService.initializeSidenav(this.sidenavRef);
  }

}
