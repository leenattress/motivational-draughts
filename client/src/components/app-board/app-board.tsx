import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { Game, Move, Space } from '../../libs/draughts';

@Component({
  tag: 'app-board',
  styleUrl: 'app-board.css',
  shadow: false,
})
export class AppBoard {
  @Prop() gamestate: Game;

  rows = 8;
  columns = 8;
  spaceHeight = 100 / this.rows;
  spaceWidth = 100 / this.columns;

  @State() from = { x: -1, y: -1 };

  @Event() move: EventEmitter<Move>;
  @Event() grab: EventEmitter<Move>;

  handleClick(x: number, y: number) {

    if (this.from.x != -1 && this.from.y != -1) {
      this.move.emit({
        x1: this.from.x,
        y1: this.from.y,
        x2: x,
        y2: y
      });
      setTimeout(() => {
        this.clearMoveState();
      }, 100)
    }

    if (this.from.x === -1 && this.from.y === -1) {
      this.clearMoveState();
      this.from.x = x;
      this.from.y = y;
      this.grab.emit();
    }
  }
  clearMoveState() {
    this.from = { x: -1, y: -1 };
  }
  componentWillLoad() {

    // escape key cancels move
    document.onkeydown = (e) => {
      if (e.code == 'Escape') {
        this.clearMoveState();
      }
    };

    // right click cancels move
    // document.addEventListener('contextmenu', event => {
    //   event.preventDefault();
    //   this.clearMoveState();
    // });
  }

  render() {
    return (
      <Host>
        {this.gamestate && (
          <div class="square-aspect">
            <div class="square-aspect--content">
              <div class="board">
                {this.gamestate.spaces.map((row: Space[], y: number) => (
                  row.map((space: Space, x: number) => {
                    const highlighted = this.from.x === x && this.from.y === y ? ' space-selected' : null;
                    const occupied = space.player !== 0 ? ' space-occupied' : null;

                    return <div
                      class={`
                      space ${(x + y) % 2 == 0 ? 'space-white' : 'space-black'} 
                      ${highlighted}
                      ${occupied}
                    `}
                      style={{ 'top': `${y * this.spaceHeight}%`, 'left': `${x * this.spaceWidth}%` }}
                      onClick={() => this.handleClick(x, y)}
                    ></div>
                  })
                ))}
                {this.gamestate.spaces.map((row: Space[], y: number) => (
                  row.map((space: Space, x: number) => {
                    const playerColour = space.player === 1 ? `piece piece-black` : `piece piece-white`;
                    const highlighted = this.from.x === x && this.from.y === y ? ' space-selected' : null;
                    // const kinged = space.king === false ? ' piece-kinged' : ' piece-regular'

                    return [
                      space.player !== 0 && (
                        <div
                          class={`${playerColour} ${highlighted}`}
                          style={{ 'transition': highlighted ? '0.3s ease-in-out' : 'none', 'top': `${y * this.spaceHeight + this.spaceHeight / 2}%`, 'left': `${x * this.spaceWidth + this.spaceWidth / 2}%` }}
                        ></div>
                      ),
                      space.player !== 0 && space.king && (
                        <div
                          class={`${playerColour} ${highlighted}`}
                          style={{ 'transition': highlighted ? '0.3s ease-in-out' : 'none', 'top': `${(y * this.spaceHeight + this.spaceHeight / 2.1) - 1}%`, 'left': `${x * this.spaceWidth + this.spaceWidth / 2}%` }}
                        ></div>
                        )
                      ]

                  })
                ))}
              </div>
            </div>
          </div>
        )
        }
      </Host >
    );
  }

}
