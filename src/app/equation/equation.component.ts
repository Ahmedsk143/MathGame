import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs/operators';
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      x: new FormControl(this.randomValue()),
      y: new FormControl(this.randomValue()),
      answer: new FormControl(''),
    },
    [MathValidators.Sum('answer', 'x', 'y')]
  );
  averageTime = 0;

  constructor() {}

  get x() {
    return this.mathForm.value.x;
  }
  get y() {
    return this.mathForm.value.y;
  }
  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        delay(300),
        filter((value) => value == 'VALID'),
        scan(
          (acc) => {
            return {
              slovedNumber: acc.slovedNumber + 1,
              initalTime: acc.initalTime,
            };
          },
          { slovedNumber: 0, initalTime: new Date() }
        )
      )
      .subscribe(({ slovedNumber, initalTime }) => {
        this.averageTime =
          (new Date().getTime() - initalTime.getTime()) / slovedNumber / 1000;
        console.log(this.averageTime);
        this.mathForm.setValue({
          x: this.randomValue(),
          y: this.randomValue(),
          answer: '',
        });
      });
  }

  randomValue() {
    return Math.floor(Math.random() * 10);
  }
}
