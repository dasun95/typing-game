import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'typing-game';

  randomText: string = faker.lorem.sentence();
  isMatched:boolean = false;
  typedText:string = '';
  progress: string = '';

  
  finished: boolean = false;

  targetTime:number = this.randomText.length*500; 
  startTime:number = Date.now();
  
  timer: any;
 

  onStartGame() {

    let startButton = (document.getElementById('startButton') as HTMLButtonElement)
    startButton.disabled = true;

    
    let input = (document.getElementById("textInput") as HTMLInputElement);
    input.disabled = false;
    input.select();

    let t1 = this.startTime
    let t2 = this.targetTime

    const timerTemp = setInterval(function () { timeCount(t1, t2) }, 1000);
    
    let filledPortion = document.getElementById('progress-bar') as HTMLProgressElement
    let display = (document.getElementById('progress') as HTMLHeadingElement);

    function timeCount(startTime: any, targetTime: any) {
      filledPortion.value = Date.now() - startTime;
      if (filledPortion.value >= targetTime) {
        clearInterval(timerTemp);
        display.innerHTML = 'GAME OVER!!';
        let input = (document.getElementById("textInput") as HTMLInputElement);
        input.disabled = true;
      }
    }
   
    this.timer = timerTemp;
  }
  

  onInput(value: string) {

    let input = (document.getElementById("textInput") as HTMLInputElement);

    this.typedText = value;

    this.isMatched = value === this.randomText.slice(0, value.length);

    if (this.isMatched) {
      let newParagraph:string = this.randomText.slice(value.length);
      (document.getElementById('text') as HTMLElement).innerHTML = newParagraph;
      this.progress = 'You are doing great!';
    } else {
      (document.getElementById('text') as HTMLElement).innerHTML = this.randomText;
      this.typedText = '';
      this.progress = 'It is going wrong!';
    }

    if (this.randomText===this.typedText) {
      this.finished = true;
      input.disabled = true;
      clearInterval(this.timer);
    }
    
  }

  onReset() {
    location.reload();
  }

}
