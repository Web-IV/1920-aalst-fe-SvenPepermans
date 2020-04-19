import { Foto } from './../foto.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  @Input() foto: Foto;
  constructor() {}

  ngOnInit(): void {}
}
