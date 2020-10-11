import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          {/* <ion-route url="/game/:id" component="app-game-online" /> */}
          <ion-route url="/local" component="app-game-local" />          
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
