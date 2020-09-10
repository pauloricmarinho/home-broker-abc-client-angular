import { Component, OnInit } from '@angular/core';

import { BolsaValoresService  } from '../../services/bolsa-valores.service';
import { ValoresPlanilha } from '../../models/ValoresPlanilha';

// Dados do Grafico
import * as CanvasJS from '../../../assets/canvasjs.min.js';
//import * as CanvasJS  from  'canvasjs';
//var JQuery = require('jquery');

//import * as CanvasJS from 'canvasjs';

@Component({	
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  val = {} as ValoresPlanilha;
  valores: ValoresPlanilha[];
  
  constructor(private service : BolsaValoresService) { }

  ngOnInit(){
	this.getValores();

	//let chart = new CanvasJS.Chart("grafico");

	
	let chart = new CanvasJS.Chart("grafico", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Basic Column Chart in Angular"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Apple" },
				{ y: 55, label: "Mango" },
				{ y: 50, label: "Orange" },
				{ y: 65, label: "Banana" },
				{ y: 95, label: "Pineapple" },
				{ y: 68, label: "Pears" },
				{ y: 28, label: "Grapes" },
				{ y: 34, label: "Lychee" },
				{ y: 14, label: "Jackfruit" }
			]
		}]
	});
		
	chart.render();
		
  }

  	// Chama o serviço para obtém todos os Valores
  	getValores() {
    //this.service.getTeste();
    
	this.service.getValores().subscribe((valores: ValoresPlanilha[]) => {      
		this.valores = valores;
	});

    //console.log(this.service.getValoresBolsa())    
  

  // Montagem Gráfico
/*
  let dataPoints = [];
	let dpsLength = 0;
	let chart = new CanvasJS.Chart("chartContainer",{
		exportEnabled: true,
		title:{
			text:"Live Chart with Data-Points from External JSON"
		},
		data: [{
			type: "spline",
			dataPoints : dataPoints,
		}]
  });
  
  $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {  
		$.each(data, function(key, value){
			dataPoints.push({x: value[0], y: parseInt(value[1])});
		});
		dpsLength = dataPoints.length;
		chart.render();
		updateChart();
  });
  

	function updateChart() {	
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
      $.each(data, function(key, value) {
			dataPoints.push({
			x: parseInt(value[0]),
			y: parseInt(value[1])
			});
			dpsLength++;
		});
		
		if (dataPoints.length >  20 ) {
      		dataPoints.shift();				
      	}
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	});

};*/
}
}
