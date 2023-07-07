import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { Orientation } from "@progress/kendo-angular-layout";
import { MobileHelper } from 'src/app/helpers/mobile.helper';
import { faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { PictureResponseModel } from 'src/app/models/picture-response';
import { DestinationResponseModel } from 'src/app/models/destination-response';
import { PictureMaps } from './picture-maps';



@Component({
  selector: 'app-travel-landing',
  templateUrl: './travel-landing.component.html',
  styleUrls: ['./travel-landing.component.scss']
})

export class TravelLandingComponent implements AfterViewInit {

  // Stores the number of picutres for each vacation category  
  // This number matches the number of files in the respective folder 
  //private pictureCount:Map<string, number> = new Map<string, number>();
  private pictureCount:Map<string, number> = new Map<string, number>(
    [
      ['Branson', 19],
      ['CedarPoint', 13],
      ['Chicago', 20],
      ['Dollywood', 11],
      ['KingsIsland', 15],
      ['MammothCave', 31],
      ['Michigan', 32],
      ['Washington', 55],
    ]
  );

  public faUpRightFromSquare = faUpRightFromSquare;

  public pictureDelay:number = 10;

  public scollViewHeight:string = MobileHelper.mobileCheck() ? "225px" :"670px";

  public scollViewWidth:string = "100%";

  public orientation:Orientation = "vertical";

  // Used to support the random picture scroll
  // Will store the random picture order for this visit to the site
  //public pictureData:Map<string, string[]> = new Map<string, string[]>();

  public pictureData:Map<string, string[]> = new Map<string, string[]>([
    ['Branson', []],
    ['CedarPoint', []],
    ['Chicago', []],
    ['Dollywood', []],
    ['KingsIsland', []],
    ['MammothCave', []],
    ['Michigan', []],
    ['Washington', []],
  ]);

  @ViewChild("branson") private bransonView: any;

  @ViewChild("cedarpoint") private cedarPointView: any;

  @ViewChild("chicago") private chicagoView: any;

  @ViewChild("dollywood") private dollywoodView: any;

  @ViewChild("kingsisland") private kingsIslandView: any;

  @ViewChild("michigan") private michiganView: any;

  @ViewChild("washington") private washingtonView: any;

  @ViewChild("mammothcave") private mammothView: any;

  public cedarPause = false;

  public kingsPause = false;

  public bransonPause = false;

  public chicagoPause = false;

  public michiganPause = false;

  public dollywoodPause = false;

  public washingtonPause = false;

  public mammothPause = false;

  private pictures:PictureResponseModel[] = [];

  private destinations:DestinationResponseModel[] = [];

  private apiCalls:number = 0;

  public constructor(private apiService:ApiService)
  {  

    this.instantiatePictures();

    /*
    this.apiService.get<DestinationResponseModel[]>
      (`Destinations/GetAllDestinations`).subscribe(resp => {
          if (resp != null) {
            this.destinations = resp;
            this.apiCalls += 1;
            this.instantiatePictures();
          }
          else {
            console.log(resp);                
            }
          },
            err => {
            console.log(err);
          });

    this.apiService.get<PictureResponseModel[]>
      (`Pictures/GetAllPictures`).subscribe(resp => {
          if (resp != null) {
            this.pictures = resp;
            this.apiCalls += 1;
            this.instantiatePictures();
          }
          else {
            console.log(resp);                
            }
          },
            err => {
            console.log(err);
          });
    
          */         
  }


  private instantiatePictures()
  {

    // Now that we have our picture orders, start the timers
    let spaceInt:number = 0;
    for (let [key] of this.pictureCount) {

      this.buildPictureOrder(key);

      setInterval(() => {
        switch(key)
        {
          case "Branson":
            if(!this.bransonPause)
              this.bransonView.next();
            break;
          case "CedarPoint":
            if(!this.cedarPause)
              this.cedarPointView.next();
            break;
          case "Chicago":
            if(!this.chicagoPause)
              this.chicagoView.next();
            break;
          case "Dollywood":
            if(!this.dollywoodPause)
              this.dollywoodView.next();
            break;
          case "KingsIsland":
            if(!this.kingsPause)
              this.kingsIslandView.next();
            break;
          case "MammothCave":
            if(!this.mammothPause)
              this.mammothView.next();
            break;
          case "Michigan":
            if(!this.michiganPause)
              this.michiganView.next();
            break;          
          case "Washington":
            if(!this.washingtonPause)
              this.washingtonView.next();
            break;
        }        
      }, (this.pictureDelay + spaceInt) * 1000);
      
      spaceInt += 1;
    }




    /*
    if (this.apiCalls === 2)
    {
      this.destinations.forEach(destination => {
        let filteredFields = this.pictures.filter((picture) => picture.destination === destination.uniqueid);
        
        this.pictureCount.set(destination.uiname, filteredFields.length);

        this.pictureData.set(destination.uiname, this.buildPictureOrder(filteredFields));



      });

      // Now that we have our picture orders, start the timers
      let spaceInt:number = 0;
      for (let [key] of this.pictureCount) {

        setInterval(() => {
          switch(key)
          {
            case "branson":
              if(!this.bransonPause)
                this.bransonView.next();
              break;
            case "cedarpoint":
              if(!this.cedarPause)
                this.cedarPointView.next();
              break;
            case "chicago":
              if(!this.chicagoPause)
                this.chicagoView.next();
              break;
            case "dollywood":
              if(!this.dollywoodPause)
                this.dollywoodView.next();
              break;
            case "kingsisland":
              if(!this.kingsPause)
                this.kingsIslandView.next();
              break;
            case "michigan":
              if(!this.michiganPause)
                this.michiganView.next();
              break;
            case "washington":
              if(!this.washingtonPause)
                this.washingtonView.next();
              break;
          }        
        }, (this.pictureDelay + spaceInt) * 1000);
        
        spaceInt += 1;
      }
    }
    */
  }

  public ngAfterViewInit(): void {

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

          
          let foundmap:any;
          switch(location)
          {
            case "Branson":
              foundmap = PictureMaps.BransonMap;
              break;
            case "CedarPoint":
              foundmap = PictureMaps.CedarPointMap;
              break;
            case "Chicago":
              foundmap = PictureMaps.ChicagoMap;
              break;
            case "Dollywood":
              foundmap = PictureMaps.DollywoodMap;
              break;
            case "KingsIsland":
              foundmap = PictureMaps.KingsIslandMap;
              break;
            case "MammothCave":
              foundmap = PictureMaps.MammothMap;
              break;
            case "Michigan":
              foundmap = PictureMaps.MichiganMap;
              break;
            case "Washington":
              foundmap = PictureMaps.WashingtonMap;
              break;
          }

          returnFilePath = 'https://imagedelivery.net/bEEggnuSWUuamo94O06FbQ/' + foundmap.get(randNum.toString()) + '/public';

          
          //returnFilePath = 'assets/images/'+ location + '/' + location + '-' + randNum.toString() + '.jpg';    
          

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

  /*
  private buildPictureOrder(pictures:PictureResponseModel[]):string[]{

    let returnFilePaths:string[] = [];
    let returnFilePath:string = "";

    let min:number = 0;
    let max:number = pictures.length - 1;


    let currentLength:number = 0;
    if(max > 0)
    {
      while(currentLength < max + 1){
        let notFound:boolean = true;

        while (notFound) {

          // Find a random picture in the number of pictures for the given location
          let randNum:number =  Math.floor(Math.random() * (max - min + 1) + min);           

          returnFilePath = 'https://imagedelivery.net/bEEggnuSWUuamo94O06FbQ/' + pictures[randNum].url + '/public';            

          if(!returnFilePaths.includes(returnFilePath)){
            
            returnFilePaths.push(returnFilePath);   
            currentLength += 1;   

            notFound = false;
          }        
        }
      }
    }

    return returnFilePaths;
  }
  */

  openImage(location:string)
  {
    let viewSource:any;
    switch(location)
          {
            case "branson":
              viewSource = this.bransonView;
              break;
            case "cedarpoint":
              viewSource = this.cedarPointView;
              break;
            case "chicago":
              viewSource = this.chicagoView;
              break;
            case "dollywood":
              viewSource = this.dollywoodView;
              break;
            case "kingsisland":
              viewSource = this.kingsIslandView;
              break;
            case "mammothcave":
              viewSource = this.mammothView;
              break;
            case "michigan":
              viewSource = this.michiganView;
              break;
            case "washington":
              viewSource = this.washingtonView;
              break;
          }

      window.open(viewSource.data[viewSource.activeIndex], "_blank");
  }
}
