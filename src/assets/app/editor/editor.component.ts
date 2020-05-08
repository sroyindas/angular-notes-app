import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  createNewBtn = false;
  saveNewNoteBtn = true;
  editOldNoteBtn = false;
  saveOldEditNoteBtn = false;
  deleteNoteBtn = false;
  createNewNote = true;
  editOldNote = false;
  desableField = true;
  desableEditBtn = true;
  desableDeleteBtn = true;
  

  enterTitle;
  enterInformation;
  dataList = [];
  getLocalData = [];
  selectID: number;
  
  constructor() { }

  ngOnInit(): void {
    this.getInitialValue();
  }

  editorFormSubmit() {
    this.enterTitle = this.enterTitle;
    this.enterInformation = this.enterInformation;
  }

  createNewSubmit() {
    this.createNewBtn = false;
    this.saveNewNoteBtn = true;
    this.editOldNoteBtn = true;
    this.saveOldEditNoteBtn = false;
    this.editOldNote = false;
    this.desableField = false;
    this.createNewNote = true;
  }

  saveNewNoteSubmit() {
    this.saveNewNoteBtn = false;
    this.createNewBtn = true;
    this.createNewNote = false;
    this.editOldNote = true;
    this.desableField = true;
    const seteditoe = localStorage.getItem('setEditorValue')
    if (seteditoe) {
      const newseteditoe = JSON.parse(seteditoe);
      newseteditoe.push({
        // id: Math.floor(Math.random()*10) + 1,
        enterTitle: this.enterTitle,
        enterInformation: this.enterInformation,
      })
      localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
    } else {
      this.dataList.push({
        // id: Math.floor(Math.random()*10) + 1,
        enterTitle: this.enterTitle,
        enterInformation: this.enterInformation,
      })
      localStorage.setItem('setEditorValue', JSON.stringify(this.dataList));
    }
  }

  selectNoteItem(id, item) {
    // this.createNewBtn = true;
    // this.saveNewNoteBtn = false;
    // this.createNewNote = false;
    // this.editOldNote = true;
    // this.editOldNoteBtn = false;
    // this.saveOldEditNoteBtn = true;
    this.desableEditBtn = false;
    this.desableDeleteBtn = false;
    this.enterTitle = item.enterTitle;
    this.enterInformation = item.enterInformation;
    return this.selectID = id;
  }

  editOldNoteSubmit() {
    this.editOldNoteBtn = false;
    this.saveOldEditNoteBtn = true;
    this.editOldNote = true;
    this.desableField = false;
  }

  saveOldEditNoteSubmit() {
    this.editOldNoteBtn = true;
    this.saveOldEditNoteBtn = false;
    this.editOldNote = true;
    this.desableField = true; 
    const seteditoe = localStorage.getItem('setEditorValue')
    const newseteditoe = JSON.parse(seteditoe);
    newseteditoe.splice(this.selectID, 1, {
      enterTitle: this.enterTitle,
      enterInformation: this.enterInformation,
    });
    localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
  }

  deleteNoteItem() {
    const seteditoe = localStorage.getItem('setEditorValue')
    const newseteditoe = JSON.parse(seteditoe);
    newseteditoe.splice(this.selectID, 1)
    localStorage.setItem('setEditorValue', JSON.stringify(newseteditoe));
  }

  public getInitialValue() {
    const seteditoe = localStorage.getItem('setEditorValue')
    if (seteditoe) {
      this.getLocalData = JSON.parse(localStorage.getItem('setEditorValue'));
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
