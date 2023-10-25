import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'myApp';

  pair: Pair = {} as Pair
  decisionSessionId: string = ''
  choiceControls: string[] = ['choice1', 'choice2'];

  choiceForm = new FormGroup({
    choice1: new FormControl(''),
    choice2: new FormControl(''),
  })

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fetchPair();
  }

  fetchPair() {
    // 5f7bb045-d6d8-46b8-9077-54bef0deff01
    if (this.decisionSessionId !== '') {
      this.http.get(`http://localhost:8080/decisions/${this.decisionSessionId}/pair`).subscribe(
        (response) => {
          this.pair = response as Pair;
        });
    }
  }

  addChoice() {
    const nextChoiceNumber = this.choiceControls.length + 1;
    const nextChoiceName = `choice${nextChoiceNumber}`;

    this.choiceForm = this.formBuilder.group({
      ...this.choiceForm.controls,
      [nextChoiceName]: new FormControl('')
    })
    this.choiceControls.push(nextChoiceName);
  }

  vote(winner: string) {
    this.http.post(`http://localhost:8080/decisions/${this.decisionSessionId}/vote`,
      {
        pairId: this.pair.pairId,
        winner: winner
      }
    ).subscribe(
      (response) => {
        this.pair = {} as Pair;
        this.fetchPair();
      })
  }

  submit() {
    const choices = Object.values(this.choiceForm.value).map((choice) => {
      return { itemName: choice };
    });

    this.http.post('http://localhost:8080/choices', choices).subscribe(
      (response) => {
        this.decisionSessionId = response as string;
        this.fetchPair();
      });
  }
}

interface CreateItemRequest {
  itemName: string;
}

interface Item {
  itemId: string;
  itemName: string;
}

interface Pair {
  pairId: string;
  items: Item[];
}
