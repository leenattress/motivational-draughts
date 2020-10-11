import { Component, h, Listen, State } from '@stencil/core';
import { Draughts, Game, Move, Space } from './../../libs/draughts';
import { toastController, modalController } from '@ionic/core';
import quotes from './../../libs/inspired/inspired'

@Component({
  tag: 'app-game-local',
  styleUrl: 'app-game-local.css',
  shadow: false,
  assetsDirs: ['assets'],
})
export class AppGameLocal {

  @State() configSounds: boolean = true;
  @State() configRotate: boolean = true;
  @State() configMusic: boolean = false;

  async presentModal() {
    const modal = await modalController.create({
      component: 'app-results',
      cssClass: 'modally',
      componentProps: {
        'winner': this.winner
      }
    });

    modal.onDidDismiss().then(() => {
      this.setupGame();
    });

    await modal.present();
  }

  async presentToast(message: string, color: string) {
    if (color === 'danger') {
      this.sndError.play()
    }
    if (color === 'success') {
      this.sndSuccess.play()
    }

    const toast = await toastController.create({
      position: 'top',
      message,
      duration: 2000,
      color,
      cssClass: 'toasty'
    });
    toast.present();
  }

  gameBoard: HTMLElement;

  gameName: string = 'local' // we need a name for a game, even local ones.
  game: Draughts = new Draughts(); // new instance of our game
  winner: number = 0;
  @State() gamestate: Game; // make the state refresh any components it is used in
  @State() turnNumber: number = 0;
  @State() turn: number = 1;

  sndStart: HTMLAudioElement = new Audio('assets/start.mp3');
  sndMove: HTMLAudioElement = new Audio('assets/move.mp3');
  sndError: HTMLAudioElement = new Audio('assets/error.mp3');
  sndSuccess: HTMLAudioElement = new Audio('assets/capture.mp3');
  sndGrab: HTMLAudioElement = new Audio('assets/grab.mp3');
  sndKing: HTMLAudioElement = new Audio('assets/king.mp3');

  setupGame() {
    this.sndStart.play();
    this.game.createGame(this.gameName); // init a blank board
    this.game.setupGame(this.gameName); // fill it with pieces in their starting positions
    this.gamestate = this.game.getGame(this.gameName); // get our game and set its state locally
    this.gamestate = this.gamestate;
    this.turnNumber = 0;
    this.turn = 1;
  }
  componentWillLoad() {
    this.setupGame();
  }

  @Listen('grab')
  grabHandler() {
    this.sndGrab.play();
  }

  @Listen('move')
  movedHandler(event: CustomEvent<Move>) {
    try {

      // play a special noise when we king a piece
      const from: Space = this.game.getSpace(this.gameName, event.detail.x1, event.detail.y1)
      if (event.detail.y2 === 0 || event.detail.y2 === 7) {
        if (!from.king) {
          this.sndKing.play()
          this.presentToast('Kinged!', 'success')
        }
      }

      // move our piece
      const captured = this.game.movePiece(this.gameName, this.gamestate.turn, event.detail);

      // we captured an enemy piece? Let's celebrate!
      if (captured) {
        this.presentToast('Captured enemy piece!', 'success')
      }

      // get our game and set its state locally
      this.gamestate = this.game.getGame(this.gameName);
      this.gamestate = this.gamestate;
      this.turnNumber = this.gamestate.turnNumber
      this.turn = this.gamestate.turn;
      this.sndMove.play()

    } catch (e) {
      this.presentToast(e, 'danger')
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Motivational Draughts</ion-title>
          <ion-buttons slot="end">
            <ion-button color="danger" onClick={() => this.presentModal()}>Surrender</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding" color={this.turn === 1 ? 'dark' : 'light'}>
        {this.winner !== 0 && (
          <div class="confetti--container">
            {Array.apply(null, { length: 10 }).map(() => (
              <div class="confetti"></div>
            ))}
          </div>
        )}
        {this.gamestate && (
          <ion-grid>
            <ion-row>
              <ion-col size="12" sizeMd="4" sizeLg="7">
                <div>
                  <h1 style={{ 'font-size': '3em'}}>{this.turn === 1 ? 'Black' : 'White'}'s Turn</h1>
                  <h2>Turn number {this.turnNumber + 1}</h2>
                  <ion-text color="medium">
                    <h2 style={{ 'font-style': 'italic', 'padding-right': '1em' }}>
                      {quotes[Math.floor(Math.random() * quotes.length)]}
                    </h2>
                  </ion-text>
                </div>
              </ion-col>
              <ion-col size="12" sizeMd="8" sizeLg="5">
                <div class={this.turn === 1 ? 'rotatable' : 'rotatable rotated'}>
                  <app-board gamestate={this.gamestate} ref={el => this.gameBoard = el as HTMLElement}></app-board>
                </div>
              </ion-col>
              <ion-col size="12" sizeMd="0" sizeLg="0">
                {/* <iframe width="100%" src="https://www.youtube-nocookie.com/embed/h7BTVFOAwkQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <iframe width="100%" src="https://www.youtube-nocookie.com/embed/HmH4W8JOifg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}

                {/* <ion-list color={this.turn === 1 ? 'dark' : 'light'}>
                  <ion-item-divider color={this.turn === 1 ? 'dark' : 'light'}>
                    <ion-label>
                      Preferences
                    </ion-label>
                  </ion-item-divider>
                  <ion-item color={this.turn === 1 ? 'dark' : 'light'}>
                    <ion-button color="danger" onClick={() => this.presentModal()}>Surrender</ion-button>
                  </ion-item>
                  <ion-item color={this.turn === 1 ? 'dark' : 'light'}>
                    <ion-label>Sounds</ion-label>
                    <ion-toggle checked={this.configSounds} onIonChange={(ev) => this.configSounds = ev.detail.checked}></ion-toggle>
                  </ion-item>

                  <ion-item color={this.turn === 1 ? 'dark' : 'light'}>
                    <ion-label>Board Rotation</ion-label>
                    <ion-toggle checked={this.configRotate} onIonChange={(ev) => this.configRotate = ev.detail.checked}></ion-toggle>
                  </ion-item>

                  <ion-item color={this.turn === 1 ? 'dark' : 'light'}>
                    <ion-label>Background Music</ion-label>
                    <ion-toggle checked={this.configMusic} onIonChange={(ev) => this.configMusic = ev.detail.checked}></ion-toggle>
                  </ion-item>
                </ion-list> */}
              </ion-col>
            </ion-row>
          </ion-grid>

        )}
      </ion-content>,
    ];
  }

}
