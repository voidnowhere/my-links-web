import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Link} from "../interfaces/link";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private baseUrl: string = `${env.baseUrl}/links`;

  constructor(private http: HttpClient) {
  }

  getAllLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.baseUrl);
  }

  setLinkFavorite(id: bigint, favorite: boolean): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}/set-favorite`, favorite);
  }
}
