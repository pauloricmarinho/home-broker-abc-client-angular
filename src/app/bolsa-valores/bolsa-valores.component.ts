import { Component, OnInit } from '@angular/core';

import { BolsaValoresService  } from '../services/bolsa-valores.service';
import { Valores } from '../models/valores';

@Component({
  selector: 'app-bolsa-valores',
  templateUrl: './bolsa-valores.component.html',
  styleUrls: ['./bolsa-valores.component.css']
})
export class BolsaValoresComponent implements OnInit {

  val = {} as Valores;
  valores: Valores[];
  
  constructor(private service : BolsaValoresService) { }

  ngOnInit(){
    this.getValores();
  }

  // Chama o serviço para obtém todos os carros
  getValores() {
    /*
    this.service.getValores().subscribe((valores: Valores[]) => {
      this.valores = valores;
    });*/
  }
  

}
