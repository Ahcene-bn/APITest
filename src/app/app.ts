import { Component, signal,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { directions } from '../service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,JsonPipe,FormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('ApiTest');

  constructor(public service:directions){};
  data=signal<any>(null);
    callMe(){
      this.service.getDirections().subscribe(data=>{
        this.data.set(data);
        console.log(data);
      });
      
    }

    lancerRecherche(){
      this.service.recherche().subscribe(data=>{
        this.data.set(data);
        console.log(data);
      })
    }


    updateElevation(event:MouseEvent){
      var init=this.service.elevation();
      console.log(init);
      this.service.updateElevation(!init);
      this.callMe();
    }

    updateRequete(requete:string){
      this.service.updateRequte(requete);
    }

    
   
  
  

  
}
