import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-birthday',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday.component.html',
  styleUrl: './birthday.component.css'
})
export class BirthdayComponent implements OnInit {
  //Toma un día después del verdadero día del cumpleaños
  birthday_sandra = new Date('1999-07-07');
  birthday_jean = new Date('2012-10-23');
  birthday_laura = new Date('1997-05-17');
  birthday_mama = new Date('1975-11-24');
  birthday_papa = new Date('1975-05-01');
  message!: string;
  countdown!: string;
  yaes: boolean = false;

  ngOnInit(): void {
    this.updateMessage();
    interval(1000).subscribe(() => this.updateMessage());
  }

  updateMessage() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const siguienteCumpleaniosSandra = this.getNextBirthday(this.birthday_sandra, currentYear, now);
    const siguienteCumpleaniosJean = this.getNextBirthday(this.birthday_jean, currentYear, now);
    const siguienteCumpleaniosLaura = this.getNextBirthday(this.birthday_laura, currentYear, now);
    const siguienteCumpleaniosMama = this.getNextBirthday(this.birthday_mama, currentYear, now);
    const siguienteCumpleaniosPapa = this.getNextBirthday(this.birthday_papa, currentYear, now);

    if (this.isToday(this.birthday_papa, now)) {
      this.message = '¡Feliz Cumpleaños Papá José Luis!';
      this.countdown = '';
      this.yaes = true;
    } else if (this.isToday(this.birthday_laura, now)) {
      this.message = '¡Feliz Cumpleaños Laura Cecilia!';
      this.countdown = '';
      this.yaes = true;
    } else if (this.isToday(this.birthday_sandra, now)) {
      this.message = '¡Feliz Cumpleaños Sandra Katherine!';
      this.countdown = '';
      this.yaes = true;
    } else if (this.isToday(this.birthday_jean, now)) {
      this.message = '¡Feliz Cumpleaños José Alexander Jean!';
      this.countdown = '';
      this.yaes = true;
    } else if (this.isToday(this.birthday_mama, now)) {
      this.message = '¡Feliz Cumpleaños Mamá Jhenny Aniceta!';
      this.countdown = '';
      this.yaes = true;
    } else {
      const nextBirthdays = [
        siguienteCumpleaniosSandra,
        siguienteCumpleaniosJean,
        siguienteCumpleaniosLaura,
        siguienteCumpleaniosMama,
        siguienteCumpleaniosPapa,
      ];

      const nextBirthday = nextBirthdays.reduce((a, b) => (a.getTime() < b.getTime() ? a : b));
      const timeDiff = nextBirthday.getTime() - now.getTime();
      this.message = 'El tiempo que falta para el próximo cumpleaños: ';
      this.countdown = this.getCountdownString(timeDiff);
      this.yaes = false;
    }
  }

  getNextBirthday(birthday: Date, currentYear: number, now: Date): Date {
    const nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
    if (now > nextBirthday) {
      nextBirthday.setFullYear(currentYear + 1);
    }
    return nextBirthday;
  }

  isToday(birthday: Date, now: Date): boolean {
    return now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate();
  }

  getCountdownString(timeDiff: number): string {
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor((timeDiff / (1000 * 60 * 60 * 24)) % 30);
    const month = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30))
    return `${month} meses, ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`;
  }
}


