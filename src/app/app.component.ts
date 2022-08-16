  import {Component} from '@angular/core';



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
    players: Players[] = []


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
      if (player == ""){
        return
      }
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

      this.winner = false;
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
        return;
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
      this.winningHorse = "";
      let tmp: boolean = true
      this.horses[0].progress = 0;
      this.horses[1].progress = 0;
      this.horses[3].progress = 0;
      this.horses[2].progress = 0;
      while (tmp) {
        if (!this.start){
          this.horses[0].progress = 0;
          this.horses[1].progress = 0;
          this.horses[2].progress = 0;
          this.horses[3].progress = 0;
          return
        }
        await this.delay(1000);
        let black = (Math.floor(Math.random() * 1001)) / 10;
        let red = (Math.floor(Math.random() * 1001)) / 10;
        let blue = (Math.floor(Math.random() * 1001)) / 10;
        let pink = (Math.floor(Math.random() * 1001)) / 10;
        this.horses[0].progress += black;
        this.horses[1].progress += red;
        this.horses[3].progress += blue;
        this.horses[2].progress += pink;

        if(black < 70 && black > 69){
          this.horses[0].progress -= 100;
        }
        if(red < 70 && red > 69){
          this.horses[1].progress -= 100;
        }
        if(blue < 70 && blue > 69){
          this.horses[2].progress -= 100;
        }
        if(pink < 70 && pink > 69){
          this.horses[3].progress -= 100;
        }
        if(black < 5 && black > 0){
          this.horses[0].progress -= 100;
        }
        if(red < 5 && red > 0){
          this.horses[1].progress -= 100;
        }
        if(blue < 5 && blue > 0){
          this.horses[2].progress -= 100;
        }
        if(pink < 5 && pink > 0){
          this.horses[3].progress -= 100;
        }
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
      this.horses[0].progress = 0;
      this.horses[1].progress = 0;
      this.horses[2].progress = 0;
      this.horses[3].progress = 0;
    }

    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    check(i: number) {
      // @ts-ignore
      let black = document.getElementById('myCheckbox1').checked;
      // @ts-ignore
      let red = document.getElementById('myCheckbox2').checked;
      // @ts-ignore
      let blue = document.getElementById('myCheckbox3').checked;
      // @ts-ignore
      let pink = document.getElementById('myCheckbox4').checked;

      if (i == 0) {
        if (red){
          // @ts-ignore
          document.getElementById('myCheckbox2').click();
        }
        if (blue){
          // @ts-ignore
          document.getElementById('myCheckbox3').click();
        }
        if (pink){
          // @ts-ignore
          document.getElementById('myCheckbox4').click();
        }
        red = false;
        blue = false;
        pink = false;
      }
      if (i == 1) {
        if (black){
          // @ts-ignore
          document.getElementById('myCheckbox1').click();
        }
        if (blue){
          // @ts-ignore
          document.getElementById('myCheckbox3').click();
        }
        if (pink){
          // @ts-ignore
          document.getElementById('myCheckbox4').click();
        }
        black = false;
        blue = false;
        pink = false;
      }
      if (i == 2) {
        if (red){
          // @ts-ignore
          document.getElementById('myCheckbox2').click();
        }
        if (black){
          // @ts-ignore
          document.getElementById('myCheckbox1').click();
        }
        if (pink){
          // @ts-ignore
          document.getElementById('myCheckbox4').click();
        }
        red = false;
        black = false;
        pink = false;
      }
      if (i == 3) {
        if (red){
          // @ts-ignore
          document.getElementById('myCheckbox2').click();
        }
        if (blue){
          // @ts-ignore
          document.getElementById('myCheckbox3').click();
        }
        if (black){
          // @ts-ignore
          document.getElementById('myCheckbox1').click();
        }
        red = false;
        blue = false;
        black = false;
      }
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



