import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-results',
  styleUrl: 'app-results.css',
  shadow: true,
})
export class AppResults {
  @Prop() winner: number = 0;
  render() {
    return (
      <Host>
        <div class="confetti--container">
          {Array.apply(null, { length: 10 }).map(() => (
            <div class="confetti"></div>
          ))}
        </div>
        <div class="results-padding">
          <h1>{this.winner === 1 ? 'Black' : 'White'} Wins!</h1>
        </div>

      </Host>
    );
  }

}
