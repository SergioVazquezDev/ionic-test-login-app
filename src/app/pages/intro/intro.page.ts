import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { INTRO_KEY } from '../../guards/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await this.storageService.set(INTRO_KEY, 'true');
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }
}
