import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerData } from './playerData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPlayerData(): Observable<PlayerData[]> {
    return this.http.get<PlayerData[]>(`${this.apiServerUrl}`)
  }

  public postPlayerData(playerData: PlayerData): Observable<PlayerData> {
    return this.http.post<PlayerData>(`${this.apiServerUrl}`, playerData)
  }
}
