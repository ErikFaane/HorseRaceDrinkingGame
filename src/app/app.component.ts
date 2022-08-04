import {Component} from '@angular/core';
import {delay} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HorseRaceDrinkingGame';
  playerSwitch: boolean = false;
  playingSwitch: boolean = false;
  start: boolean = false;
  amountOfPlayers: number = 0;
  winner: boolean = false;
  winningHorse: string = "";


  horses: Horses[] = [
    {
      color: "black",
      img: "../assets/images/black.png",
      progress: 0
    },
    {
      color: "blue",
      img: "../assets/images/blue.png",
      progress: 0
    },
    {
      color: "pink",
      img: "../assets/images/pink.png",
      progress: 0
    },
    {
      color: "red",
      img: "../assets/images/red.png",
      progress: 0
    }
  ];


  // @ts-ignore
  players: Players[] = [
    {
      name: "Erik",
      drinkVal: 0,
      horseColor: "none"
    },
  ]


  startGame() {
    this.playingSwitch = true;
    this.playerSwitch = false;
  }

  Players() {
    this.playerSwitch = !this.playerSwitch;
  }


  addPlayer() {

    // @ts-ignore
    let player = document.getElementById('name').value;
    this.players.push({
      name: player.toString(),
      drinkVal: 0,
      horseColor: "none"
    });
  }

  quitGame() {
    this.playingSwitch = false;
    this.start = false;
    this.winner = false;

  }

  addDrinkingBet() {
    // @ts-ignore
    let black = document.getElementById('myCheckbox1').checked;
    // @ts-ignore
    let red = document.getElementById('myCheckbox2').checked;
    // @ts-ignore
    let blue = document.getElementById('myCheckbox3').checked;
    // @ts-ignore
    let pink = document.getElementById('myCheckbox4').checked;

    if (black) {
      this.players[this.amountOfPlayers].horseColor = "black"
    } else if (red) {
      this.players[this.amountOfPlayers].horseColor = "red"
    } else if (blue) {
      this.players[this.amountOfPlayers].horseColor = "blue"
    } else if (pink) {
      this.players[this.amountOfPlayers].horseColor = "pink"
    } else {
      alert("Try again.. stupid ni");
    }
    // @ts-ignore
    this.players[this.amountOfPlayers].drinkVal = document.getElementById('amount').value;
    console.log(this.players)

    this.amountOfPlayers += 1;
    if (this.amountOfPlayers >= this.players.length) {
      this.start = true;
      this.amountOfPlayers = 0;
    }
  }

  async startSim() {
    let tmp: boolean = true
    this.horses[0].progress = 0;
    this.horses[1].progress = 0;
    this.horses[3].progress = 0;
    this.horses[2].progress = 0;
    while (tmp) {
      await this.delay(1000);
      this.horses[0].progress += (Math.floor(Math.random() * 1001)) / 10;
      this.horses[1].progress += (Math.floor(Math.random() * 1001)) / 10;
      this.horses[3].progress += (Math.floor(Math.random() * 1001)) / 10;
      this.horses[2].progress += (Math.floor(Math.random() * 1001)) / 10;
      if (this.horses[0].progress > 1000 ||
        this.horses[1].progress > 1000 ||
        this.horses[2].progress > 1000 ||
        this.horses[3].progress > 1000) {
        this.winner = true;
        this.start = false
        tmp = false
        let tmpMax = Math.max(...this.horses.map(o => o.progress))
        for (let horse of this.horses) {
          if (horse.progress >= tmpMax) {
            this.winningHorse = horse.color;
          }
        }
      }
    }

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export interface Horses {
  color: string,
  img: string,
  progress: number
}

export interface Players {
  name: string,
  drinkVal: number,
  horseColor: string

}



