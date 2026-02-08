import { Injectable, signal,computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class directions {
   constructor(private http: HttpClient) {}

   /**
    * signal pour définir si le paramétre elevation est compté ou pas dans le calcul 
    */
   private _elevation=signal<boolean>(true);
   readonly elevation=computed(
    ()=>this._elevation()
   )
   readonly elevationToString=this.elevation()==true ? "true":"false"


   private _requete=signal<string|null>("Grenoble");
   readonly requete=computed(
    ()=>this._requete()
   )
   getDirections() {
     const url= 'https://api.openrouteservice.org/v2/directions/driving-car/json'
     const body = {"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]],
                    "elevation":this.elevationToString
                    ,"maximum_speed":200
                    //paramétre x:
                    //paramétre y:
                    //paramétre z:
                    // paramétre f:
     };
     const headers = {
       'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
       'Authorization': 'ta clé OpenRouteServices',
       'Content-Type': 'application/json; charset=utf-8'
     };
     return this.http.post(url,body,{headers:headers});
    }

    recherche(){
      const url='https://api.openrouteservice.org/geocode/search?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImU3OWI5YTJiZGRkMjQxNjJiODA0MzRhZTQ5MzhiNTM0IiwiaCI6Im11cm11cjY0In0=&text='+this.requete();

      return this.http.get(url);
    }


    /**
     * mise à jour de l'elevaition en fonction de l'entrée 
     * @param elevation 
     */
    updateElevation(elevation:boolean):void{
        this._elevation.set(elevation);

    }

    updateRequte(requete:string):void{
      this._requete.set(requete);
    }
}
   

