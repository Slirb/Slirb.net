import { AfterViewInit, Component,  ViewChild } from '@angular/core';

@Component({
  selector: 'app-travel-landing',
  templateUrl: './travel-landing.component.html',
  styleUrls: ['./travel-landing.component.scss']
})

export class TravelLandingComponent implements AfterViewInit {

  // Stores the number of picutres for each vacation category  
  // This number matches the number of files in the respective folder 
  private pictureCount:Map<string, number> = new Map<string, number>(
    [
      ['Branson', 19],
      ['CedarPoint', 13],
      ['Chicago', 20],
      ['Dollywood', 11],
      ['KingsIsland', 15],
      ['Michigan', 28],
      ['Washington', 55],
    ]
  );

  public pictureDelay:number = 10;

  public scollViewHeight:string = "670px";

  public scollViewWidth:string = "100%";

  // Used to support the random picture scroll
  // Will store the random picture order for this visit to the site
  public pictureData:Map<string, string[]> = new Map<string, string[]>([
    ['Branson', []],
    ['CedarPoint', []],
    ['Chicago', []],
    ['Dollywood', []],
    ['KingsIsland', []],
    ['Michigan', []],
    ['Washington', []],
  ]);

  @ViewChild("Branson") private bransonView: any;

  @ViewChild("CedarPoint") private cedarPointView: any;

  @ViewChild("Chicago") private chicagoView: any;

  @ViewChild("Dollywood") private dollywoodView: any;

  @ViewChild("KingsIsland") private kingsIslandView: any;

  @ViewChild("Michigan") private michiganView: any;

  @ViewChild("Washington") private washingtonView: any;

  public constructor()
  {    
    for (let [key] of this.pictureCount) {

      this.buildPictureOrder(key);

      /*
      let targetEle = (<HTMLInputElement>document.getElementById(key))
        if (targetEle != null) targetEle.src = this.getRandomPicture(key);
        

      setInterval(() => {
        let targetElement = (<HTMLInputElement>document.getElementById(key))
        if (targetElement != null) targetElement.next();
      }, this.pictureDelay * 1000);
      */
    }
  }

  public ngAfterViewInit(): void {

    let spaceInt:number = 0;
    for (let [key] of this.pictureCount) {

      setInterval(() => {
        switch(key)
        {
          case "Branson":
            this.bransonView.next();
            break;
          case "CedarPoint":
            this.cedarPointView.next();
            break;
          case "Chicago":
            this.chicagoView.next();
            break;
          case "Dollywood":
            this.dollywoodView.next();
            break;
          case "KingsIsland":
            this.kingsIslandView.next();
            break;
          case "Michigan":
            this.michiganView.next();
            break;
          case "Washington":
            this.washingtonView.next();
            break;
        }        
      }, (this.pictureDelay + spaceInt) * 1000);
      
      spaceInt += 1;
    }
  }

  private buildPictureOrder(location:string){

    let returnFilePath:string = "";

    let min:number = 1;
    let max:number = this.pictureCount.get(location) ?? 0;


    let currentLength:number = 0;
    if(max > 0)
    {
      while(currentLength < max){
        let notFound:boolean = true;

        while (notFound) {

          // Find a random picture in the number of pictures for the given location
          let randNum:number =  Math.floor(Math.random() * (max - min + 1) + min); 

          // Filenames will always be Location-number
          // Path is always assets/images/Location/
          returnFilePath = 'assets/images/'+ location + '/' + location + '-' + randNum.toString() + '.jpg';    

          if(!this.pictureData.get(location)?.includes(returnFilePath)){

            // Add the current image to the list of used images for this location
            let currentPaths:string[] = this.pictureData?.get(location) ?? [];
            currentPaths?.push(returnFilePath);
            
            this.pictureData.set(location, currentPaths);   
            currentLength += 1;   

            notFound = false;
          }        
        }

      }

            
    }
  }


}
