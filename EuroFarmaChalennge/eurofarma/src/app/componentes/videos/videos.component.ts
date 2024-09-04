import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbUrl: string;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;
  selectedVideoUrl: SafeResourceUrl | null = null;
  role: string | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadVideosBasedOnRole();
  }

  loadVideosBasedOnRole() {
    this.role = localStorage.getItem('userRole');
    console.log('User Role:', this.role); // Log para verificar a role

    switch (this.role) {
      case 'ti':
        this.videos = [
          {
            id: 'video1',
            title: 'TI Video 1',
            url: 'https://www.youtube.com/embed/HHBsvKnCkwI',
            thumbUrl: 'https://img.youtube.com/vi/HHBsvKnCkwI/0.jpg'
          },
          {
            id: 'video2',
            title: 'TI Video 2',
            url: 'https://www.youtube.com/embed/oPmhE_EmLjk',
            thumbUrl: 'https://img.youtube.com/vi/oPmhE_EmLjk/0.jpg'
          },
          {
            id: 'video3',
            title: 'TI Video 3',
            url: 'https://www.youtube.com/embed/s25hNv8UPKo',
            thumbUrl: 'https://img.youtube.com/vi/s25hNv8UPKo/0.jpg'
          },
          {
            id: 'video4',
            title: 'TI Video 4',
            url: 'https://www.youtube.com/embed/RH49ElZTTNY',
            thumbUrl: 'https://img.youtube.com/vi/RH49ElZTTNY/0.jpg'
          },
        ];
        break;
      case 'admin':
        this.videos = [
          {
            id: 'video1',
            title: 'Admin Video 1',
            url: 'https://www.youtube.com/embed/HHBsvKnCkwI',
            thumbUrl: 'https://img.youtube.com/vi/HHBsvKnCkwI/0.jpg'
          },
          {
            id: 'video2',
            title: 'Admin Video 2',
            url: 'https://www.youtube.com/embed/oPmhE_EmLjk',
            thumbUrl: 'https://img.youtube.com/vi/oPmhE_EmLjk/0.jpg'
          },
          {
            id: 'video3',
            title: 'Admin Video 3',
            url: 'https://www.youtube.com/embed/s25hNv8UPKo',
            thumbUrl: 'https://img.youtube.com/vi/s25hNv8UPKo/0.jpg'
          },
          {
            id: 'video4',
            title: 'Admin Video 4',
            url: 'https://www.youtube.com/embed/RH49ElZTTNY',
            thumbUrl: 'https://img.youtube.com/vi/RH49ElZTTNY/0.jpg'
          },
        ];
        break;
      case 'financeiro':
        this.videos = [
          {
            id: 'video1',
            title: 'Financeiro Video 1',
            url: 'https://www.youtube.com/embed/HHBsvKnCkwI',
            thumbUrl: 'https://img.youtube.com/vi/HHBsvKnCkwI/0.jpg'
          },
          {
            id: 'video2',
            title: 'Financeiro Video 2',
            url: 'https://www.youtube.com/embed/oPmhE_EmLjk',
            thumbUrl: 'https://img.youtube.com/vi/oPmhE_EmLjk/0.jpg'
          },
          {
            id: 'video3',
            title: 'Financeiro Video 3',
            url: 'https://www.youtube.com/embed/s25hNv8UPKo',
            thumbUrl: 'https://img.youtube.com/vi/s25hNv8UPKo/0.jpg'
          },
          {
            id: 'video4',
            title: 'Financeiro Video 4',
            url: 'https://www.youtube.com/embed/RH49ElZTTNY',
            thumbUrl: 'https://img.youtube.com/vi/RH49ElZTTNY/0.jpg'
          },
        ];
        break;
      default:
        console.log('Nenhum vídeo encontrado para a role:', this.role);
        this.videos = [];
    }

    if (this.videos.length > 0) {
      this.selectedVideo = this.videos[0]; // Seleciona o primeiro vídeo como padrão
      this.selectedVideoUrl = this.getSafeUrl(this.selectedVideo.url);
    }
  }

  selectVideo(video: Video) {
    this.selectedVideo = video;
    this.selectedVideoUrl = this.getSafeUrl(video.url);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
