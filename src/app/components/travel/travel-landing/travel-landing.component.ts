import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { Orientation } from "@progress/kendo-angular-layout";
import { MobileHelper } from 'src/app/helpers/mobile.helper';
import { faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { PictureResponseModel } from 'src/app/models/picture-response';
import { DestinationResponseModel } from 'src/app/models/destination-response';


@Component({
  selector: 'app-travel-landing',
  templateUrl: './travel-landing.component.html',
  styleUrls: ['./travel-landing.component.scss']
})

export class TravelLandingComponent implements AfterViewInit {

  // Stores the number of picutres for each vacation category  
  // This number matches the number of files in the respective folder 
  private pictureCount:Map<string, number> = new Map<string, number>();

  public faUpRightFromSquare = faUpRightFromSquare;

  public pictureDelay:number = 10;

  public scollViewHeight:string = MobileHelper.mobileCheck() ? "225px" :"670px";

  public scollViewWidth:string = "100%";

  public orientation:Orientation = "vertical";

  // Used to support the random picture scroll
  // Will store the random picture order for this visit to the site
  public pictureData:Map<string, string[]> = new Map<string, string[]>();

  @ViewChild("branson") private bransonView: any;

  @ViewChild("cedarpoint") private cedarPointView: any;

  @ViewChild("chicago") private chicagoView: any;

  @ViewChild("dollywood") private dollywoodView: any;

  @ViewChild("kingsisland") private kingsIslandView: any;

  @ViewChild("michigan") private michiganView: any;

  @ViewChild("washington") private washingtonView: any;

  public cedarPause = false;

  public kingsPause = false;

  public bransonPause = false;

  public chicagoPause = false;

  public michiganPause = false;

  public dollywoodPause = false;

  public washingtonPause = false;

  private pictures:PictureResponseModel[] = [];

  private destinations:DestinationResponseModel[] = [];

  private apiCalls:number = 0;

  public constructor(private apiService:ApiService)
  {  
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
    
  }


  private instantiatePictures()
  {
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
  }

  public ngAfterViewInit(): void {

  }

  private buildPictureOrder(pictures:PictureResponseModel[]):string[]{

    let returnFilePaths:string[] = [];
    let returnFilePath:string = "";

    let min:number = 1;
    let max:number = pictures.length;


    let currentLength:number = 0;
    if(max > 0)
    {
      while(currentLength < max){
        let notFound:boolean = true;

        while (notFound) {

          // Find a random picture in the number of pictures for the given location
          let randNum:number =  Math.floor(Math.random() * (max - min + 1) + min);           

          returnFilePath = 'https://imagedelivery.net/bEEggnuSWUuamo94O06FbQ/' + pictures.find((picture)=> picture.name === randNum.toString())?.url + '/public';            

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
