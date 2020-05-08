import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public createNewBtn = false;
  public saveNewNoteBtn = true;
  public editOldNoteBtn = false;
  public saveOldEditNoteBtn = false;
  public deleteNoteBtn = false;
  public createNewNote = true;
  public editOldNote = false;
  public desableField = true;
  public desableEditBtn = true;
  public desableDeleteBtn = true;
  public editMode = false;
  public normalMode = true;
  public enterTitle = '';
  public enterInformation = '';
  public dataList = [];
  public getLocalData = [];
  public selectID: number;
  public currentDate: string;
  public searchTerm: string;
  public searchItem = [];
  
  constructor( private datePipe: DatePipe ) {}

  public ngOnInit(): void {
    this.getInitialValue();
    const date = new Date();
    this.currentDate = this.datePipe.transform(date,"MMM d, y, h:mm:ss a")
  }

  public  search() {  
    if(!this.searchTerm) {
      this.getInitialValue();
    } else {
      this.searchItem = this.getLocalData.filter((response) => {
        return response.enterTitle.toLocaleLowerCase().match(this.searchTerm.toLocaleLowerCase());
      });
    }
  }

  public editorFormSubmit() {
    this.enterTitle = this.enterTitle;
    this.enterInformation = this.enterInformation;
  }

  public createNewSubmit() {
    this.createNewBtn = false;
    this.saveNewNoteBtn = true;
    this.editOldNoteBtn = true;
    this.saveOldEditNoteBtn = false;
    this.editOldNote = false;
    this.desableField = false;
    this.createNewNote = true;
    this.enterTitle = '';
    this.enterInformation = '';
  }

  public saveNewNoteSubmit() {
    if (this.enterTitle === '' || this.enterInformation === '') {
      alert('Please fillup the note!');
      return;
    }
    this.saveNewNoteBtn = false;
    this.createNewBtn = true;
    this.createNewNote = false;
    this.editOldNote = true;
    this.desableField = true;
    const seteditoe = localStorage.getItem('setEditorValue')
    this.getLocalData.push({
      enterTitle: this.enterTitle,
      enterInformation: this.enterInformation,
      dateTime: this.currentDate,
    })
    this.searchItem = this.getLocalData;
    if (seteditoe) {
      const newseteditoe = JSON.parse(seteditoe);
      newseteditoe.push({
        enterTitle: this.enterTitle,
        enterInformation: this.enterInformation,
        dateTime: this.currentDate,
      })
      localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
    } else {
      this.dataList.push({
        enterTitle: this.enterTitle,
        enterInformation: this.enterInformation,
        dateTime: this.currentDate,
      })
      localStorage.setItem('setEditorValue', JSON.stringify(this.dataList));
    }
  }

  public selectNoteItem(id, item) {
    this.editOldNoteBtn = true;
    this.deleteNoteBtn = true;
    this.desableEditBtn = false;
    this.desableDeleteBtn = false;
    this.enterTitle = item.enterTitle;
    this.enterInformation = item.enterInformation;
    return this.selectID = id;
  }

  public sendTitle() {
    this.getLocalData[this.selectID].enterTitle = this.enterTitle;
    this.getLocalData[this.selectID].enterInformation = this.enterInformation
  }

  public editOldNoteSubmit() {
    this.editOldNoteBtn = false;
    this.saveOldEditNoteBtn = true;
    this.editOldNote = true;
    this.desableField = false;
    this.normalMode = false;
    this.editMode = true;
  }

  public saveOldEditNoteSubmit() {
    if (this.enterTitle === '' || this.enterInformation === '') {
      alert('Please fillup the note!');
      return;
    }
    this.editOldNoteBtn = true;
    this.saveOldEditNoteBtn = false;
    this.editOldNote = true;
    this.desableField = true; 
    const seteditoe = localStorage.getItem('setEditorValue')
    const newseteditoe = JSON.parse(seteditoe);
    newseteditoe.splice(this.selectID, 1, {
      enterTitle: this.enterTitle,
      enterInformation: this.enterInformation,
      dateTime: this.currentDate,
    });
    localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
  }

  public deleteNoteItem() {
    this.getLocalData.splice(this.selectID, 1)
    const seteditoe = localStorage.getItem('setEditorValue')
    const newseteditoe = JSON.parse(seteditoe);
    newseteditoe.splice(this.selectID, 1)
    localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
  }

  public getInitialValue() {
    const seteditoe = localStorage.getItem('setEditorValue')
    if (seteditoe) {
      this.getLocalData = JSON.parse(localStorage.getItem('setEditorValue'));
      this.searchItem = this.getLocalData;
      this.createNewBtn = true;
      this.saveNewNoteBtn = false;
      this.editOldNoteBtn = true;
      this.saveOldEditNoteBtn = false;
      this.deleteNoteBtn = true;
      this.createNewNote = false
      this.editOldNote = true;
    }
  }
}
