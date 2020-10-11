import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-piece',
  styleUrl: 'app-piece.css',
  shadow: true,
})
export class AppPiece {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
