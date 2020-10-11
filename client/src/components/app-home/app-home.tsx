import { Component, h, State } from '@stencil/core';
import quotes from './../../libs/inspired/inspired'
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() spicy = false;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

        <ion-grid>
          <ion-row>
            <ion-col size="12" sizeMd="6" sizeLg="6">
              <ion-text>
                <h1 style={{ 'font-weight': 'bold' }}>
                  Motivational Draughts
                </h1>
              </ion-text>
              <ion-text color="medium">
                <h2 style={{ 'font-style': 'italic' }}>
                  {quotes[Math.floor(Math.random() * quotes.length)]}
                </h2>
              </ion-text>
            </ion-col>
            <ion-col size="12" sizeMd="6" sizeLg="6">
              <ion-text color="medium">
                {/* <ion-item>
                <ion-label>Spicy {this.spicy}</ion-label>
                <ion-toggle checked={this.spicy} onIonChange={ev => (this.spicy = ev.detail.checked)} />
                </ion-item> */}
                <ion-button href="/local" expand="block">
                  Local Game
                </ion-button>
                <ion-button href="/online" expand="block" disabled>
                  Online Game
                </ion-button>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>


      </ion-content>,
    ];
  }
}
