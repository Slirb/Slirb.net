import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { Orientation } from "@progress/kendo-angular-layout";

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

  private mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent);
    return check;
  };


  public scollViewHeight:string = this.mobileCheck() ? "225px" :"670px";

  public scollViewWidth:string = "100%";

  public orientation:Orientation = "vertical";

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
