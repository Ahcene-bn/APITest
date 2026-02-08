import { Component, signal,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { directions } from '../service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('ApiTest');

  constructor(private service:directions){};
  data=signal<any>(null);
    callMe(){
      this.service.getDirections().subscribe(data=>{
        this.data.set(data);
        console.log(data);
      });
      
    }


    updateElevation(event:MouseEvent){
      var init=this.service.elevation();
      console.log(init);
      this.service.updateElevation(!init);
      this.callMe();
    }

    
   
  
  

  
}
