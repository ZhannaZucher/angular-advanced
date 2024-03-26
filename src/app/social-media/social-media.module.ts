import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './services/posts.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SocialMediaRoutingModule],
  providers: [PostsService], //comme on charge le module social-media en lazy-loading, on ne crée pas le service avec providedIn: root, sinon il sera chargé au moment du chargement du app module, mais on le déclare(le service) dans le tableau de providers du module social-media
})
export class SocialMediaModule {}
