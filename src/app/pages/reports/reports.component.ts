import { Component, OnInit } from '@angular/core';

import { BolsaValoresService  } from '../../services/bolsa-valores.service';
import { ValoresPlanilha } from '../../models/ValoresPlanilha';



import * as JQuery  from  '../../../assets/jquery-1.11.1.min';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};

  val = {} as ValoresPlanilha;
  valores: ValoresPlanilha[];

  constructor(private service : BolsaValoresService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.getValores();

    //JQuery('#financial-table').DataTable();
  }

  // Chama o serviço para obtém todos os carros
  getValores() {
    
    this.service.getValores().subscribe((valores: ValoresPlanilha[]) => {
      this.valores = valores;
    });
}

}
