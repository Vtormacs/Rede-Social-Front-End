import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../models/post/post';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from "../create-post/create-post.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PostComponent, CommentComponent, CommonModule, CreatePostComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  postService = inject(PostService);
  posts: Post[] = [];
  selectedPostId: string | null = null;
  showModal: boolean = false;

  constructor() {
    this.findAllValidos();
  }

  findAll() {
    this.postService.findAll().subscribe({
      next: (value) => {
        this.posts = value.map((post) => {
          const validComments =
            post.comments?.filter((comment) => comment.valido === true) || [];
          const randomImage = this.postService.getRandomAnimalImage(
            post.profileAnimal
          );
          return {
            ...post,
            comments: validComments,
            imagem: randomImage.path,
            imagemNome: randomImage.name,
          };
        });
      },
      error: (err) => {
        console.error('Error: ' + err);
        alert('Error: ' + err);
      },
    });
  }

  findAllValidos() {
    this.postService.findAllValidos().subscribe({
      next: (value) => {
        this.posts = value.map((post) => {
          const validComments =
            post.comments?.filter((comment) => comment.valido === true) || [];
          const randomImage = this.postService.getRandomAnimalImage(
            post.profileAnimal
          );
          return {
            ...post,
            comments: validComments,
            imagem: randomImage.path,
            imagemNome: randomImage.name,
          };
        });
      },
      error: (err) => {
        console.error('Error: ' + err);
        alert('Error: ' + err);
      },
    });
  }

  onPostCreated() {
    setTimeout(() => {
      this.findAllValidos();
    }, 1500); // Atualiza o feed após 2 segundos
  }
}
