import { Component, OnInit } from '@angular/core';

import { BolsaValoresService  } from '../services/bolsa-valores.service';
import { ValoresPlanilha } from '../models/ValoresPlanilha';

import * as CanvasJS from '../../assets/canvasjs.stock.min';
import * as JQuery  from  '../../assets/jquery-1.11.1.min';
@Component({
  selector: 'app-bolsa-valores',
  templateUrl: './bolsa-valores.component.html',
  styleUrls: ['./bolsa-valores.component.css']
})
export class BolsaValoresComponent implements OnInit {

  val = {} as ValoresPlanilha;
  valores: ValoresPlanilha[];
  
  constructor(private service : BolsaValoresService) { }

  ngOnInit(){
   //this.valores = 
   this.getValores();


  var dps1 = [], dps2= [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    title:{
      text:""
    },
    subtitles: [{
      text: " Gráficos SMA, EMA e MACD ",
      fontSize: 12
    }],
    theme: "light2",
    exportEnabled: true,
    charts: [{
      axisY: {
        prefix: "R$"
      },
      legend: {
        verticalAlign: "top",
        horizontalAlign: "left",
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "candlestick",
        showInLegend: true,
        name: "Preço das Ações",
        yValueFormatString: "R$#,###.00",
        dataPoints : dps1
      }],
    }],
    navigator: {
      data: [{
        dataPoints: dps2
      }],
      slider: {
        minimum: new Date(2020, 3, 1),
        maximum: new Date(2019, 10, 1)
      }
    }
  });

  
   
 
 

  //JQuery.getJSON("http://localhost:8080/home-broker-abc-api/valores", function(data) {

  this.service.getValores().subscribe((valores: ValoresPlanilha[]) => {
      this.valores = valores;

    for(var i = 0; i < this.valores.length; i++){
      dps1.push({x: new Date(this.valores[i].date), y: [Number(this.valores[i].open), Number(this.valores[i].high), Number(this.valores[i].low), Number(this.valores[i].close)]});
      dps2.push({x: new Date(this.valores[i].date), y: Number(this.valores[i].close)});
    }
    stockChart.render();

    

      //JQuery("#sma").on("change", function(){
      //alert('SMA');
      for(var i=0; i<stockChart.charts[0].data.length; i++ ) {
        if(stockChart.charts[0].data[i].name === "Média Móvel Simples SMA") {
          stockChart.charts[0].data[i].remove();
          return;
        }
      }
      var sma = calculateSMA(dps1, 7);
      stockChart.charts[0].addTo("data", { type: "line", dataPoints: sma, showInLegend: true, yValueFormatString: "$#,###.00", name: "Simple Moving Average"})
      // });

      // EMA
      for(var i=0; i<stockChart.charts[0].data.length; i++ ) {
        if(stockChart.charts[0].data[i].name === "EMA") {
          stockChart.charts[0].data[i].remove();
          return;
        }
      }
      var ema = calculateEMA(dps1, 7);
      stockChart.charts[0].addTo("data", {type: "line", name: "EMA", showInLegend: true, yValueFormatString: "$#,###.##", dataPoints: ema});
  
      
      // MACD
      if(stockChart.charts.length > 1) {
        stockChart.options.charts.pop();
        stockChart.render();
        return;
      }
      var ema9 = null;
      var ema12 = calculateEMA(dps1, 12),
          ema26 = calculateEMA(dps1, 26),
          macd = [], ema9;
      for(var i = 0; i < ema12.length; i++) {
        macd.push({x: ema12[i].x, y: (ema12[i].y - ema26[i].y)});
      }
      ema9 = calculateEMA(macd, 9);
      stockChart.addTo("charts", {height: 100, data: [{type: "line", name: "MACD", showInLegend: true, yValueFormatString: "#,###.00", dataPoints: macd}], legend: {horizontalAlign: "left"}, toolTip: {shared: true}});
      stockChart.charts[1].addTo("data", {type: "line", name: "Signal", showInLegend: true, yValueFormatString: "#,##0.00", dataPoints: ema9});
    //});
  //});
});

  function calculateSMA(dps, count){
    var avg = function(dps){
      var sum = 0, count = 0, val;
      for (var i = 0; i < dps.length; i++) {
        val = dps[i].y[3]; sum += val; count++;
      }
      return sum / count;
    };
    var result = [], val;
    count = count || 5;
    for (var i=0; i < count; i++)
      result.push({ x: dps[i].x , y: null});
    for (var i=count - 1, len=dps.length; i < len; i++){
      val = avg(dps.slice(i - count + 1, i));
      if (isNaN(val))
        result.push({ x: dps[i].x, y: null});
      else
        result.push({ x: dps[i].x, y: val});
    }
    return result;
  }
  function calculateEMA(dps,count) {
    var k = 2/(count + 1);
    var emaDps = [{x: dps[0].x, y: dps[0].y.length ? dps[0].y[3] : dps[0].y}];
    for (var i = 1; i < dps.length; i++) {
      emaDps.push({x: dps[i].x, y: (dps[i].y.length ? dps[i].y[3] : dps[i].y) * k + emaDps[i - 1].y * (1 - k)});
    }
    return emaDps;
  }
      
  //stockChart.render();

  }

  // Chama o serviço para obtém todos os carros
  getValores() {
    
      this.service.getValores().subscribe((valores: ValoresPlanilha[]) => {
        this.valores = valores;

      });
  }
  

}
