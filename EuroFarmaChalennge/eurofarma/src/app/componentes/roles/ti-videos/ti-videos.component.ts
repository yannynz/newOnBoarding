import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ti-videos',
  templateUrl: './ti-videos.component.html',
  styleUrls: ['./ti-videos.component.css']
})
export class TiVideosComponent implements OnInit {
  videos = [
    {
      id: 'video1',
      title: 'Video Exemplo 1 - Título',
      url: 'https://www.youtube.com/embed/HHBsvKnCkwI',
      thumbUrl: 'https://img.youtube.com/vi/HHBsvKnCkwI/0.jpg' // URL da miniatura
    },
    {
      id: 'video2',
      title: 'Video Exemplo 2 - Título',
      url: 'https://www.youtube.com/embed/mUxzKVrSAjs',
      thumbUrl: 'https://img.youtube.com/vi/mUxzKVrSAjs/0.jpg' // URL da miniatura
    },
    {
      id: 'video3',
      title: 'Video Exemplo 3 - Título',
      url: 'https://www.youtube.com/embed/oPmhE_EmLjk',
      thumbUrl: 'https://img.youtube.com/vi/oPmhE_EmLjk/0.jpg' // URL da miniatura
    },
    {
      id: 'video4',
      title: 'Video Exemplo 4 - Título',
      url: 'https://www.youtube.com/embed/4g3CSJh9zio',
      thumbUrl: 'https://img.youtube.com/vi/4g3CSJh9zio/0.jpg' // URL da miniatura
    }
  ];

  selectedVideo: any = this.videos[0]; // Vídeo inicial selecionado
  selectedVideoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.selectedVideoUrl = this.getSafeUrl(this.selectedVideo.url);
  }

  ngOnInit(): void {
    // Método `ngOnInit` sem erros para não interromper o carregamento do componente
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
    this.selectedVideoUrl = this.getSafeUrl(video.url);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
