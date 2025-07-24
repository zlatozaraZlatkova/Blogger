import { Component, Input, OnInit } from '@angular/core';

import { IProfile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() profileData: IProfile | null = null;

  ngOnInit(): void {
    console.log("provide data form parent", this.profileData)
  }


}
