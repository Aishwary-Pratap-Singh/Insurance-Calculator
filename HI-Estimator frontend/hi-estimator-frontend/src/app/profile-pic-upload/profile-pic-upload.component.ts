import { HttpClient } from "@angular/common/http";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: "app-profile-pic-upload",
  templateUrl: "./profile-pic-upload.component.html",
  styleUrls: ["./profile-pic-upload.component.scss"],
})
export class ProfilePicUploadComponent implements OnInit {

  url = "http://localhost:3000/images"
  imageSrc: any;
  imageFile: any;

  //base64s
  imageString: string | undefined;

  //json
  json = {};

  color: ThemePalette = 'primary'
  accept = "image/*"
  multiple = "false"

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ProfilePicUploadComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImage()
  }

  

  loadImage(){
    let username = localStorage.getItem("username")
    this.http.get("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/img/"+username).subscribe(
      (response: any) => {
        this.imageString = response["image"]
      }
    )
  }


  onClose() {
    this.dialogRef.close();
  }

  addPictures() {
    this.json = {
      email : localStorage.getItem("username"),
      image: this.imageString,
    };
    this.http
      .put("https://hi-estimator-backend-urtjok3rza-wl.a.run.app/img/update", this.json)
      .subscribe((response) => {
        console.log(response);
      });
  }

  public picked(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.imageFile = file;
      this.handleInputChange(file); //turn into base64
    } else {
      alert("No file selected");
    }
  }

  handleInputChange(files: File) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  
  _handleReaderLoaded(e: { target: any }) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(",") + 1);
    //this.imageSrc = base64result;
    this.imageString = base64result;
  }

  onUpload() {
    // send to backend
  }

  

  
}
