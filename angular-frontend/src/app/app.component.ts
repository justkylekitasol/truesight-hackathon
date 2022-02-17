import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CSVRecord } from './CSVModel';
import { ViewChild } from '@angular/core';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(ngbConfig: NgbConfig) {
    ngbConfig.animation = false;
  }
  title = 'angular-frontend';
  public records: any[] = [];
  public playerId: any[] = [];
  public kills: any[] = [];
  public deaths: any[] = [];
  public assists: any[] = [];
  public creepScore: any[] = [];
  public goldEarned: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.csvJSON(csvData))
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.team = curruntRecord[0].trim();
        csvRecord.playerId = curruntRecord[1].trim();
        this.playerId.push(csvRecord.playerId);
        csvRecord.opponent = curruntRecord[2].trim();
        csvRecord.position = curruntRecord[3].trim();
        csvRecord.champion = curruntRecord[4].trim();
        csvRecord.kills = curruntRecord[5].trim();
        this.kills.push(csvRecord.kills);
        csvRecord.deaths = curruntRecord[6].trim();
        this.deaths.push(csvRecord.deaths);
        csvRecord.assists = curruntRecord[7].trim();
        this.assists.push(csvRecord.assists);
        csvRecord.creepScore = curruntRecord[8].trim();
        this.creepScore.push(csvRecord.creepScore);
        csvRecord.goldEarned = curruntRecord[9].trim();
        this.goldEarned.push(csvRecord.goldEarned);
        csvRecord.result = curruntRecord[10].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  csvJSON(csvRecordsArray: any) {
    var lines=csvRecordsArray.split("\n");
    var result = [];
    console.log(typeof lines)
    var headers=['id', 'team', 'playerId', 'opponent', 'position', 'champion', 'kills', 'deaths', 'assists', 'creepScore', 'goldEarned', 'result']
    console.log(headers)
    for(var i=1;i<lines.length;i++){

      var obj:any = {};
      var currentline=lines[i].split(",");
      currentline.unshift(i)
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  kdaData: ChartData<'line'> = {
    labels: this.playerId,
    datasets: [
      { label: 'Kills', data: this.kills, tension: 0.5},
      { label: 'Deaths', data: this.deaths, tension: 0.5},
      { label: 'Assists', data: this.assists, tension: 0.5},
    ],
  };
  creepsData: ChartData<'line'> = {
    labels: this.playerId,
    datasets: [
      {label: 'Creeps', data: this.creepScore, tension: 0.5}
    ]
  }
  goldData: ChartData<'line'> = {
    labels: this.playerId,
    datasets: [
      {label: 'Gold Earned', data: this.goldEarned, tension: 0.5}
    ]
  }
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
  };
}
