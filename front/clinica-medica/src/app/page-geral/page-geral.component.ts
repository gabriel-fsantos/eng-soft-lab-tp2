import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-geral',
  templateUrl: './page-geral.component.html',
  styleUrls: ['./page-geral.component.scss']
})
export class PageGeralComponent implements OnInit {

  constructor(private router: Router) { }

  logged = !true;

  ngOnInit(): void { }

}
