import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CSVRecord } from './CSVModel';
import { ViewChild } from '@angular/core';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs";
import { PredictService  } from './predict.service';
import { IBattleData } from './battledata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(ngbConfig: NgbConfig, private predictService: PredictService) {
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
  public battleData: IBattleData[] =[];
  public errorMessage: string = "";
  public jsonDataSample: string = "";
  obj = [
    {
        "id": 1,
        "team": "UOL",
        "playerId": "9800271",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 50,
        "deaths": 3,
        "assists": 3,
        "creepScore": 522,
        "goldEarned": 9721,
        "result": "L"
    },
    {
        "id": 2,
        "team": "UOL",
        "playerId": "9800273",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 5,
        "deaths": 3,
        "assists": 3,
        "creepScore": 200,
        "goldEarned": 9721,
        "result": "L"
    },    {
        "id": 3,
        "team": "UOL",
        "playerId": "9800274",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 50,
        "deaths": 3,
        "assists": 3,
        "creepScore": 522,
        "goldEarned": 9721,
        "result": "L"
    },
    {
        "id": 4,
        "team": "UOL",
        "playerId": "9800275",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 5,
        "deaths": 3,
        "assists": 3,
        "creepScore": 200,
        "goldEarned": 9721,
        "result": "L"
    },    {
        "id": 5,
        "team": "UOL",
        "playerId": "9800276",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 50,
        "deaths": 3,
        "assists": 3,
        "creepScore": 522,
        "goldEarned": 9721,
        "result": "L"
    },
    {
        "id": 6,
        "team": "UOL",
        "playerId": "9800277",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 5,
        "deaths": 3,
        "assists": 3,
        "creepScore": 200,
        "goldEarned": 9721,
        "result": "L"
    },    {
        "id": 7,
        "team": "UOL",
        "playerId": "9800278",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 50,
        "deaths": 3,
        "assists": 3,
        "creepScore": 522,
        "goldEarned": 9721,
        "result": "L"
    },
    {
        "id": 8,
        "team": "UOL",
        "playerId": "9800279",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 5,
        "deaths": 3,
        "assists": 3,
        "creepScore": 200,
        "goldEarned": 9721,
        "result": "L"
    },    {
        "id": 9,
        "team": "UOL",
        "playerId": "9800280",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 50,
        "deaths": 3,
        "assists": 3,
        "creepScore": 522,
        "goldEarned": 9721,
        "result": "L"
    },
    {
        "id": 10,
        "team": "UOL",
        "playerId": "9800281",
        "opponent": "GS",
        "position": "Jungle",
        "champion": "Tigreal",
        "kills": 5,
        "deaths": 3,
        "assists": 3,
        "creepScore": 200,
        "goldEarned": 9721,
        "result": "L"
    }
]

  sub!: Subscription;

  public timeSeries: any[] = [];
  public gPlayer1: any[] = [];
  public gPlayer2: any[] = [];
  public gPlayer3: any[] = [];
  public gPlayer4: any[] = [];
  public gPlayer5: any[] = [];
  public gPlayer6: any[] = [];
  public gPlayer7: any[] = [];
  public gPlayer8: any[] = [];
  public gPlayer9: any[] = [];
  public gPlayer10: any[] = [];
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
        this.jsonDataSample = this.csvJSON(csvData);
        console.log(this.jsonDataSample);
        console.log(this.obj);
        console.log(JSON.stringify(this.jsonDataSample));
        console.log(JSON.stringify(this.obj));
        if(csvRecordsArray.length>9){
          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        } else {
          this.records = this.getGoldData(csvRecordsArray, headersRow.length);
        }
        console.log(headersRow)
        //console.log(this.csvJSON(csvData))
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  //   this.sub = this.predictService.getProducts().subscribe({
  //     next: products => {
  //         this.battleData = products;
  //         console.log(this.battleData);
  //     },
  //     error: err => this.errorMessage = err

  // });

    this.sub = this.predictService.getPredictionJson(this.jsonDataSample).subscribe({
      next: products => {
          this.battleData = products;
          console.log(this.battleData);
      },
      error: err => this.errorMessage = err
  });
  console.log(this.battleData);
  }

  getGoldData(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.timeSeries = curruntRecord[0].trim();
        this.timeSeries.push(csvRecord.timeSeries);

        csvRecord.gPlayer1 = curruntRecord[1].trim();
        this.gPlayer1.push(csvRecord.gPlayer1);

        csvRecord.gPlayer2 = curruntRecord[2].trim();
        this.gPlayer2.push(csvRecord.gPlayer2);
        console.log(curruntRecord[2])
        csvRecord.gPlayer3 = curruntRecord[3].trim();
        this.gPlayer3.push(csvRecord.gPlayer3);

        csvRecord.gPlayer4 = curruntRecord[4].trim();
        this.gPlayer4.push(csvRecord.gPlayer4);

        csvRecord.gPlayer5 = curruntRecord[5].trim();
        this.gPlayer5.push(csvRecord.gPlayer5);

        csvRecord.gPlayer6 = curruntRecord[6].trim();
        this.gPlayer6.push(csvRecord.gPlayer6);

        csvRecord.gPlayer7 = curruntRecord[7].trim();
        this.gPlayer7.push(csvRecord.gPlayer7);

        csvRecord.gPlayer8 = curruntRecord[8].trim();
        this.gPlayer8.push(csvRecord.gPlayer8);

        csvRecord.gPlayer9 = curruntRecord[9].trim();
        this.gPlayer9.push(csvRecord.gPlayer9);

        csvRecord.gPlayer10 = curruntRecord[10].trim();
        this.gPlayer10.push(csvRecord.gPlayer10);

        csvArr.push(csvRecord);
      }
    }
    return csvArr;
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
    var headers=['id', 'team', 'playerId', 'opponent', 'position', 'champion', 'kills', 'deaths', 'assists', 'creepScore', 'goldEarned', 'result']
    for(var i=1;i<lines.length;i++){
      var obj:any = {};
      var currentline=lines[i].split(",");
      currentline.unshift(i)
      for(var j=0;j<headers.length;j++){
        if(this.isNum(currentline[j])) {
          if(headers[j] == 'playerId') {
            obj[headers[j]] = currentline[j]
          } else {
            obj[headers[j]] = parseInt(currentline[j]);
          }
        } else {
          obj[headers[j]] = currentline[j]
        }
      }
      result.push(obj);
      console.log(obj)
    }
    return JSON.stringify(result); //JSON
  }
  isNum(val:any){
    return !isNaN(val)
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
    datasets: [
      {label: '9800002', data: this.gPlayer1},
      {label: '9800003', data: this.gPlayer2},
      {label: '9800004', data: this.gPlayer3},
      {label: '9800005', data: this.gPlayer4},
      {label: '9800006', data: this.gPlayer5},
      {label: '9800007', data: this.gPlayer6},
      {label: '9800008', data: this.gPlayer7},
      {label: '9800009', data: this.gPlayer8},
      {label: '9800010', data: this.gPlayer9},
      {label: '9800011', data: this.gPlayer10},
    ],
    labels: this.timeSeries,
    // datasets: [
    //   {label: 'Gold Earned', data: this.goldEarned, tension: 0.5}
    // ]
  }


  chartOptions: ChartOptions = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
  };
}
