import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostListComponent, PostListItemComponent],
  imports: [CommonModule, SocialMediaRoutingModule, SharedModule],
  providers: [PostsService], //comme on charge le module social-media en lazy-loading, on ne crée pas le service avec providedIn: root, sinon il sera chargé au moment du chargement du app module, mais on le déclare(le service) dans le tableau de providers du module social-media
})
export class SocialMediaModule {}
