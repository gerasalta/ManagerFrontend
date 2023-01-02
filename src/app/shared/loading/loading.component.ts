import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { LoadingService } from 'src/app/services/loading/loading.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;

  constructor(
    public _loading: LoadingService
  ){}

  ngOnInit(){
    this._loading.getLoadingSetting()
    .subscribe({
      next: r => { this.color = r.color; this.mode = r.mode; this.value = r.value;},
    })
  }


}
