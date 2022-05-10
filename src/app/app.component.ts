import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

let randomTextII = faker.lorem.sentence();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  randomText = randomTextII;
  isMatched = false;
  typedText = '';
  progress = '';
  finished = false;

  onInput(value: string) {

    this.typedText = value;

    this.isMatched = value == this.randomText.slice(0, value.length);

    if (this.isMatched) {
      let newParagraph = this.randomText.slice(value.length);
      (document.getElementById('text') as HTMLElement).innerHTML = newParagraph;
      this.progress = 'You are doing great!';
    } else {
      (document.getElementById('text') as HTMLElement).innerHTML = this.randomText;
      this.typedText = '';
      this.progress = 'It is going wrong!';
    }

    if (this.randomText==this.typedText) {
      this.finished = true;
      const input = (document.getElementById("textInput") as HTMLElement)
      input.setAttribute('disabled','');
    }
    
  }

  onReset() {
    location.reload()
  }

}
