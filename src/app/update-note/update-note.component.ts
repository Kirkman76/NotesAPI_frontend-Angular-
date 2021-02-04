import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

 
  note : any
  id: any
  private routeSubscription: Subscription;
  answer: any
  @ViewChild('idTb') idTb:ElementRef;
  @ViewChild('dateTb') dateTb:ElementRef;
  @ViewChild('noteTb') noteTb:ElementRef;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    
    this.routeSubscription = route.queryParams.subscribe(params=>this.id=params['id']);
   }

  ngOnInit(): void {
    this.FillFields(this.id.toString())
  }


  public FillFields(id: string){
    
    this.http.get(`http://localhost:3000/onenote?id=${id}`).subscribe((note) => {this.note = note
    this.idTb.nativeElement.value = this.note.Id
    this.dateTb.nativeElement.value = this.note.Date
    this.noteTb.nativeElement.value = this.note.Note
  })
  }

  UpdateNote(idTb: string, dateTb: string, noteTb: string){

    const myHeaders1 = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    const body = `{"Id": "${idTb}", "Date": "${dateTb}", "Note": "${noteTb}" }`

    this.http.put('http://localhost:3000/putnote', body,  {headers:myHeaders1}).subscribe(r=>{
      
      this.answer = r
      
      if(this.answer.Status == "INPUT_BAD"){
        alert("Не все данные введены!")
      }
      else if(this.answer.Status == "OK"){
        this.idTb.nativeElement.value = ''
        this.dateTb.nativeElement.value = ''
        this.noteTb.nativeElement.value = ''
        alert("Успешно!")
      }
      else if(this.answer.Status == "DB_BAD"){
        alert("Ошибка базы данных!")
      }
    })

  }


}