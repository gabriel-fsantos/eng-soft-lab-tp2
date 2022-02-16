import { Component, OnInit } from '@angular/core';

import { GeralService } from '../geral.service';

@Component({
  selector: 'app-page-geral',
  templateUrl: './page-geral.component.html',
  styleUrls: ['./page-geral.component.scss']
})
export class PageGeralComponent implements OnInit {

  logged = false;

  constructor(private readonly geralService: GeralService) { }

  ngOnInit() {

    if (localStorage.getItem('userName'))
      this.logged = true;

    this.geralService.loginEvent.subscribe((logged) => {
      this.logged = logged;
    });

  }

  getLocalStorage(): string | null {
    return localStorage.getItem('eMedico');
  }

  sair() {
    localStorage.removeItem('eMedico');
    localStorage.removeItem('userName');
    this.logged = false;
  }

}
