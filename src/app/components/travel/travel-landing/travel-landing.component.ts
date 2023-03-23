import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { Orientation } from "@progress/kendo-angular-layout";
import { MobileHelper } from 'src/app/helpers/mobile.helper';


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

  public scollViewHeight:string = MobileHelper.mobileCheck() ? "225px" :"670px";

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

  private BransonMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "5ec210dd-62a1-4533-0d14-116d0df43b00"],
      ['2', "1eec4b98-4369-4534-6830-18e42c6cec00"],
      ['3', "8cafb2e0-25b7-4311-d455-b8c14dae8500"],
      ['4', "c36f7e90-1b19-42e9-b7a9-e26dc6d2f100"],
      ['5', "2d60b72d-5495-4a38-7a96-e94131b28b00"],
      ['6', "e6a61111-716e-4375-d749-49a28a0fe600"],
      ['7', "2798e04b-2be1-4f6e-ec19-934c7bd0b500"],
      ['8', "05325999-cf4d-4f7c-4464-076b2028c200"],
      ['9', "ebd9b80e-1abd-4723-a99e-334fe298b600"],
      ['10', "64d66e08-05e3-4e8a-2761-155c85a4da00"],
      ['11', "a08915da-6293-44cb-742b-8abc941b3100"],
      ['12', "71b0e920-c841-4d24-0047-837480176200"],
      ['13', "b00cc130-2349-4280-3713-4d2cffdbce00"],
      ['14', "9413962e-e12e-41f4-3a1d-f8d9a0f92700"],
      ['15', "08208c78-0ed2-411c-3c29-988a41877d00"],
      ['16', "2c8b7cac-6d23-4293-82ba-9bc1f89fbe00"],
      ['17', "d4d79244-f7d3-4999-2da0-df0b3dbc3e00"],
      ['18', "8f79f98d-6968-4ded-4fac-221601f43200"],
      ['19', "6c676dbc-4aaa-49a3-c873-33f30991bd00"]
    ]
  );

  private CedarPointMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "ee20dd75-9a82-423f-6771-e7c887253000"],
      ['2', "ebfbaeec-4590-47c4-31f6-ac42aab73000"],
      ['3', "d2b88009-c0d5-4962-2eb3-15656387b500"],
      ['4', "6caf1020-a6d8-4244-25c4-97786baf2f00"],
      ['5', "0cd24d6c-02aa-47e5-8597-256a558d7f00"],
      ['6', "7e9748d8-b7b7-474b-d546-c2a1e4a8e000"],
      ['7', "78a6619f-ba7e-469a-3d92-0282f73cc400"],
      ['8', "81b3cb69-2f3e-41e2-c5cc-0df8df92b800"],
      ['9', "1d37c38e-2216-4ab6-b32b-047b0b261900"],
      ['10', "a9912ba8-ac87-4321-f0cd-f0ca17f75500"],
      ['11', "ea12d9e5-e7c6-48e9-215e-ad5654b1fd00"],
      ['12', "40d781df-8fe8-4ae9-5cd1-8aeddc3e1b00"],
      ['13', "824df172-441f-4114-21e8-a4ac9a8d6500"]
    ]
  );

  private ChicagoMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "c4273031-891a-4fc4-09df-b97f3a891d00"],
      ['2', "2d962b81-8cfd-4c8b-54ae-fcb98e400a00"],
      ['3', "be5fbfdd-ad9d-414f-3408-edc1ce95cc00"],
      ['4', "87135977-3a42-454c-ccd0-fb841a4af100"],
      ['5', "a78d74ae-44a4-43d8-3b59-f0f212f05c00"],
      ['6', "cecfa1b7-5e5e-4efd-dd30-46db881b2f00"],
      ['7', "2a8c4a86-66f3-4df0-1ce4-87da54241000"],
      ['8', "c000050a-ae08-4dab-d9be-0bd1a7faa900"],
      ['9', "6d8864a1-1250-4d3a-32cd-5bb89b087700"],
      ['10', "74046e6c-dc03-43b9-89f4-2575eca8b000"],
      ['11', "f4d95eac-b958-4027-814c-b36614cb7600"],
      ['12', "57d146fd-7f15-4029-d47d-43054805f500"],
      ['13', "c40e2b82-3b7a-4a11-c982-87dee0148a00"],
      ['14', "6a77506d-310c-4db7-cadc-a3bbd290e700"],
      ['15', "fec8b1e7-8e0c-4c7b-91b2-a3efbaae8400"],
      ['16', "e692f57e-a7d3-44b7-8709-8e7e1789d600"],
      ['17', "35e86aa0-4fe5-43e8-6f73-9f37785ed400"],
      ['18', "48512bea-5a3f-4405-3000-77142c2a1b00"],
      ['19', "10037630-3278-4189-8637-8b044b10ae00"],
      ['20', "0c0219e9-3793-4776-a3a6-aa9b9035ff00"]
    ]
  );

  private DollywoodMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "a92a70b3-c4c2-4db8-1187-bfe2603f3400"],
      ['2', "463549ef-5511-48ee-ee68-2240bb719a00"],
      ['3', "8d6b330e-91ea-4f5c-567c-bce68c8d1100"],
      ['4', "90ec6a62-d2d4-416e-ecae-feeb35b90400"],
      ['5', "5e0eddf1-3d9e-4777-0eee-1a0c10986800"],
      ['6', "3974e5e7-6cc5-4967-cf8a-adc28ab06900"],
      ['7', "0be85b1d-ab5e-47e8-2c05-d5cb4489d300"],
      ['8', "8a778491-f69f-4fab-d9ea-e0dfc3a27300"],
      ['9', "049a4a2a-5bba-4af0-11c8-b53f1eff1c00"],
      ['10', "f7ce148e-9af3-43ba-d738-ed19a9eccc00"],
      ['11', "75982c07-7eac-499e-9a18-363bbea52400"]
    ]
  );

  private KingsIslandMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "8a657a8c-d35a-4e67-782a-6e7b1a29ea00"],
      ['2', "2690c6d2-890a-4eac-84bc-3600e4fb3900"],
      ['3', "f6bc2c67-e5e8-478f-cb5f-8946e6591800"],
      ['4', "0b50b0f2-49c6-4b8a-4d73-2f9218132800"],
      ['5', "1d685db3-9f32-4242-f31f-d757e29b1200"],
      ['6', "e688d61f-f43f-4b7e-929d-c38b18fa9800"],
      ['7', "009a3c44-5092-422b-8bc5-a1a2a1bf3200"],
      ['8', "6e870a87-a97e-4a9c-7b12-3c74f2a51700"],
      ['9', "aaf72d06-b5c1-4cfe-5708-a97ab3961100"],
      ['10', "63894ebf-b592-49cb-f2f0-5b7f73060100"],
      ['11', "1b892638-d558-4e06-c7df-351e6b06b500"],
      ['12', "0ac4c230-3c45-4f88-4718-ffbda3cbf800"],
      ['13', "c069306c-838a-48cf-8db6-d31aba586800"],
      ['14', "8aa4a392-a3e5-4227-b701-3828145a0300"],
      ['15', "13cf68a2-af8f-4a5b-695d-8a89197eee00"]
    ]
  );

  private MichiganMap:Map<string, string> =  new Map<string, string>(
    [
      ['1', "4f443dd2-bd31-4c4a-a7b9-cbdd21f08200"],
      ['2', "6ea44dc7-47e8-4621-d360-10e222ba8100"],
      ['3', "9c0d8211-6660-4c76-04a1-7237c64a3600"],
      ['4', "677b673f-ff23-4dbd-dd12-589bd9d7f100"],
      ['5', "2f404175-2675-4bbb-abb0-edd43df0b900"],
      ['6', "2bc673ff-10dd-46ad-b724-1b01ad145500"],
      ['7', "be0cdaf1-1cd4-4768-20e6-e6186995e500"],
      ['8', "2e5640c3-85ca-44d1-5311-f597d1c7e200"],
      ['9', "7cdf1d5e-b497-491d-43d2-edb85ba7d200"],
      ['10', "7f58edf6-b1fb-4a9f-e434-8e55659d6900"],
      ['11', "d4cd95f9-7923-4612-9e06-75da6dadc000"],
      ['12', "ef02dfb6-3126-40a3-434d-6dd21cfc0c00"],
      ['13', "6d3f8077-3c55-4a35-2c3b-82687d9bec00"],
      ['14', "6377a9e9-5536-4bb2-c786-c0f83a7ee500"],
      ['15', "dab76e1a-c076-4be7-52ef-527681387500"],
      ['16', "dc71274b-ba69-452a-f66a-3b534350b500"],
      ['17', "6500c3c8-3183-435c-b89f-50a0ec64d400"],
      ['18', "ec442468-bae7-4625-0104-edc1d6cea600"],
      ['19', "29ae5d01-c0c9-4b1a-0822-502582574b00"],
      ['20', "34012f09-70f3-4e73-5299-abd91719c800"],
      ['21', "aa2b3722-0e0b-4615-3771-0e139a56b100"],
      ['22', "bca8ee77-6758-4729-6c60-e212c1892e00"],
      ['23', "eb8c3e53-e4f1-4692-7a3c-b11c28909500"],
      ['24', "25b3c7c8-1c6a-445a-9898-09b74b9c9c00"],
      ['25', "470ff9ff-7de1-4f74-4712-92e0d48cd900"],
      ['26', "e328e5f3-3935-491f-4d56-8a93f0e6c900"],
      ['27', "0a74d26e-d75d-40c0-aeeb-ec4b0bbdcf00"],
      ['28', "1b607f22-fea1-4c25-3db8-98829b73c500"]
    ]
  );

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

          if(location != 'Washington')
          {
            let foundmap:any;
            switch(location)
            {
              case "Branson":
                foundmap = this.BransonMap;
                break;
              case "CedarPoint":
                foundmap = this.CedarPointMap;
                break;
              case "Chicago":
                foundmap = this.ChicagoMap;
                break;
              case "Dollywood":
                foundmap = this.DollywoodMap;
                break;
              case "KingsIsland":
                foundmap = this.KingsIslandMap;
                break;
              case "Michigan":
                foundmap = this.MichiganMap;
                break;
            }

            returnFilePath = 'https://imagedelivery.net/bEEggnuSWUuamo94O06FbQ/' + foundmap.get(randNum.toString()) + '/public';

          }
          else{
            returnFilePath = 'assets/images/'+ location + '/' + location + '-' + randNum.toString() + '.jpg';    
          }          

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
