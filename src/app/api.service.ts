import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api'; // URL de ton API backend

  constructor(private http: HttpClient) { }

  // Méthode pour uploader les fichiers
  /*uploadFiles(sqlFile: File, textFile: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('sqlFile', sqlFile);
    formData.append('textFile', textFile);

    return this.http.post<string>(`${this.apiUrl}/upload`, formData);
  }*/

  uploadFiles(sqlFile: File, textFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('sqlFile', sqlFile, sqlFile.name);
    formData.append('textFile', textFile, textFile.name);

    return this.http.post<string>(`${this.apiUrl}/upload`, formData, {
      responseType: 'text' as 'json'  // Force la réponse en texte
    });
  }

  // Méthode pour analyser les fichiers
  analyzeFiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analyze`, { responseType: 'text' as 'json' });
  }

  // Méthode pour générer le script de recyclage
  recycleScript(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/recycle`, { responseType: 'text' as 'json' });
  }

  // Méthode pour télécharger le fichier généré
  downloadGeneratedFile(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }

  // Méthode pour supprimer le fichier généré
  deleteGeneratedFile(): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete`, {
      responseType: 'text' as 'json'  // Force la réponse en texte
    });
  }
}
