import { Component, OnInit, Injectable, ElementRef, ViewChild  } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})

export class NoteFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  answer: any
  @ViewChild('idTb') idTb:ElementRef;
  @ViewChild('dateTb')dateTb:ElementRef;
  @ViewChild('noteTb') noteTb:ElementRef;

  AddNote(idTb: string, dateTb: string, noteTb: string) {
    const body = `{"Id": "${idTb}", "Date": "${dateTb}", "Note": "${noteTb}" }`
    

    const myHeaders1 = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })

    this.http.post('http://localhost:3000/addnote', body,  {headers:myHeaders1}).subscribe(r=>{
      
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