import { ICard, Suit } from "../interfaces/state";
import { Position } from "../interfaces/util";

enum CardValue {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13
}

interface Pip {
    left: string;
    top: string;
    flip?: boolean;
}

export class Card implements ICard {
    private _value: number;

    get value(): number {
        return this._value;
    }
    set value(v: number) {
        this._value = v;
        this.displayValue = this.getDisplayValue();
        this.pips = this.getPips();
    }

    private _suit: Suit;
    get suit(): Suit {
        return this._suit;
    }
    set suit(suit: Suit) {
        this._suit = suit;
    }
    position: Position;
    rotate: number;

    private _faceUp: boolean;
    get faceUp(): boolean {
        return this._faceUp;
    }
    set faceUp(faceUp: boolean) {
        this._faceUp = faceUp;
        if (this.el) {
            if (faceUp) {
                this.el.classList.add('face-up');
            } else {
                this.el.classList.remove('face-up');
            }
        }
    }
    corners: string[];
    pips: Pip[];
    displayValue: string;

    el: HTMLElement;

    private front: HTMLElement;
    private back: HTMLElement;

    constructor(suit: Suit, value: number, position?: Position, rotate?: number, faceUp?: boolean) {
        this.value = value;
        this.suit = suit;
        this.position = position || { x: 0, y: 0 };
        this.faceUp = faceUp || true;
        this.corners = [ 'top left', 'bottom right'];
    }

    updateCard(update: ICard) {
        for (let prop in update) {
            this[prop] = update[prop];
        }
    }

    toggleFaceUp(): void {
        this.faceUp = !this.faceUp;
    }

    createElement(): HTMLElement {
        if (this.el) {
            return this.el;
        }
        const card = document.createElement('card');

        this.front = this.createFront();
        this.back = this.createBack();

        card.appendChild(this.front);
        card.appendChild(this.back);

        if (this.faceUp) {
            card.classList.add('face-up');
        }

        this.el = card;

        return card;
    }

    createFront(): HTMLElement {
        const front = document.createElement('front');
        for (let corner of this.corners) {
            front.appendChild(this.createCorner(corner));
        }

        const pipsContainer = document.createElement('pips');
        if (!this.pips.length) {
            const pipEl = document.createElement('pip');
            const value = document.createElement('h1');
            value.innerText = this.displayValue;
            pipsContainer.appendChild(value);
        } else {
            for (let pip of this.pips) {
                pipsContainer.appendChild(this.createPip(pip));
            }
        }
        front.appendChild(pipsContainer);
        return front;
    }

    createBack(): HTMLElement {
        const back = document.createElement('back');
        back.style.backgroundImage = `url('assets/card-back.png')`;
        return back;
    }

    createCorner(corner: string): HTMLElement {
        const el = document.createElement('corner');
        el.className = corner;
        const value = document.createElement('h1');
        value.innerText = this.displayValue;
        const pip = document.createElement('pip');
        console.log(this.suit);
        pip.classList.add(Suit[this.suit].toLowerCase());
        el.appendChild(value);
        el.appendChild(pip);
        return el;
    }

    createPip(pip: Pip): HTMLElement {
        const el = document.createElement('pip');
        el.style.left = pip.left;
        el.style.top = pip.top;
        el.classList.add(Suit[this.suit].toLowerCase());
        if (pip.flip) {
            el.classList.add('flip');
        }
        return el;
    }

    getDisplayValue(): string {
        switch (this.value) {
            case CardValue.Ace:
                return 'A';
            case CardValue.King:
                return 'K';
            case CardValue.Queen:
                return 'Q';
            case CardValue.Jack:
                return 'J';
            default:
                return this.value.toString();
        }
    }

    getPips() {
        switch (this.value) {
            case CardValue.Ace:
            return [
              { left: '50%', top: '50%' }
            ];
          case CardValue.Two:
            return [
              { left: '50%', top: '20%' },
              { left: '50%', top: '80%', flip: true }
            ];
          case CardValue.Three:
            return [
              { left: '50%', top: '50%' },
              { left: '50%', top: '20%' },
              { left: '50%', top: '80%', flip: true }
            ];
          case CardValue.Four:
            return [
              { left: '33%', top: '20%' },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '20%' },
              { left: '67%', top: '80%', flip: true }
            ];
          case CardValue.Five:
            return [
              { left: '50%', top: '50%' },
              { left: '33%', top: '20%' },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '20%' },
              { left: '67%', top: '80%', flip: true }
            ];
          case CardValue.Six:
            return [
              { left: '33%', top: '50%' },
              { left: '33%', top: '20%' },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '50%' },
              { left: '67%', top: '20%' },
              { left: '67%', top: '80%', flip: true }
            ];
          case CardValue.Seven:
            return [
              { left: '33%', top: '50%' },
              { left: '33%', top: '20%' },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '50%' },
              { left: '67%', top: '20%' },
              { left: '67%', top: '80%', flip: true },
              { left: '50%', top: '35%' }
            ];
          case CardValue.Eight:
            return [
              { left: '33%', top: '20%' },
              { left: '33%', top: '40%' },
              { left: '33%', top: '60%', flip: true },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '20%' },
              { left: '67%', top: '40%' },
              { left: '67%', top: '60%', flip: true },
              { left: '67%', top: '80%', flip: true }
            ];
          case CardValue.Nine:
            return [
              { left: '50%', top: '50%' },
              { left: '33%', top: '20%' },
              { left: '33%', top: '40%' },
              { left: '33%', top: '60%', flip: true },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '20%' },
              { left: '67%', top: '40%' },
              { left: '67%', top: '60%', flip: true },
              { left: '67%', top: '80%', flip: true }
            ];
          case CardValue.Ten:
            return [
              { left: '50%', top: '35%' },
              { left: '50%', top: '65%', flip: true },
              { left: '33%', top: '20%' },
              { left: '33%', top: '40%' },
              { left: '33%', top: '60%', flip: true },
              { left: '33%', top: '80%', flip: true },
              { left: '67%', top: '20%' },
              { left: '67%', top: '40%' },
              { left: '67%', top: '60%', flip: true },
              { left: '67%', top: '80%', flip: true }
            ];
          default:
            return [];
        }
    }
}
