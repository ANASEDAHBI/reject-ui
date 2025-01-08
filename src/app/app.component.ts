import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sqlFile: File | null = null;
  textFile: File | null = null;
  responseMessage: string = '';

  constructor(private apiService: ApiService) {}

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'sql') {
      this.sqlFile = file;
    } else if (fileType === 'text') {
      this.textFile = file;
    }
  }

 

  onUpload() {
    if (this.sqlFile && this.textFile) {
      this.apiService.uploadFiles(this.sqlFile, this.textFile).subscribe({
        next: (response) => {
          this.responseMessage = response;
        },
        error: (error) => {
          this.responseMessage = `Erreur: ${error.message}`;
        }
      });
    } else {
      this.responseMessage = 'Veuillez sélectionner les fichiers SQL et TXT.';
    }
  }
    

  onAnalyze() {
    this.apiService.analyzeFiles().subscribe({
      next: (response) => {
        this.responseMessage = 'Analyse terminée : ' + JSON.stringify(response);
      },
      error: (error) => {
        this.responseMessage = `Erreur: ${error.message}`;
      }
    });
  }

  onRecycle() {
    this.apiService.recycleScript().subscribe({
      next: (response) => {
        this.responseMessage = 'Script généré : ' + response;
      },
      error: (error) => {
        this.responseMessage = `Erreur: ${error.message}`;
      }
    });
  }

  onDownload() {
    this.apiService.downloadGeneratedFile().subscribe({
      next: (response) => {
        // Créer un objet Blob à partir de la réponse
        const blob = new Blob([response], { type: 'text/plain' });
        
        // Obtenir la date actuelle et formater sous le format "DDMMYYYY"
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0'); // Ajouter un zéro devant si nécessaire
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ajouter un zéro devant si nécessaire
        const year = currentDate.getFullYear();
  
        // Construire le nom du fichier
        const formattedDate = `${day}${month}${year}`;
  
        // Créer un lien pour télécharger le fichier
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Ajouter la date au nom du fichier
        a.download = `recycling_script_${formattedDate}.sql`;
        a.click();
      },
      error: (error) => {
        this.responseMessage = `Erreur: ${error.message}`;
      }
    });
  }
  

  onDelete() {
    this.apiService.deleteGeneratedFile().subscribe({
      next: (response) => {
        this.responseMessage = response;
      },
      error: (error) => {
        this.responseMessage = `Erreur: ${error.message}`;
      }
    });
  }
}
