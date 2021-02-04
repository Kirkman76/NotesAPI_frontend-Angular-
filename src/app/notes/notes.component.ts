import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: any;
  constructor(private http: HttpClient) {
    this.getAllNotes()
   }

   getAllNotes(){

      this.http.get('http://localhost:3000/allnotes')
      .subscribe((notes) => {this.notes = notes})
   }

  ngOnInit(): void {
  }

  DelNote(Id: string){
    let body= JSON.stringify({
      Id: Id
    });

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };

    this.http.delete('http://localhost:3000/delnote', options).subscribe(r=>{
      this.getAllNotes()})
   
  }



}