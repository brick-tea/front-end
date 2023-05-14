import { Component, OnInit } from '@angular/core';
import {
  UserService,
  UserInfo,
  UserUpdate,
} from 'src/app/service/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private userS: UserService, private fb: FormBuilder) {}
  profile: UserInfo = {
    account: '',
    nickname: '',
    email: '',
    major: '',
    grade: 0,
    createdAt: '',
  };
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.loadProfile();
  }
  buildForm() {
    this.profileForm = this.fb.group({
      nickname: [
        this.profile.nickname,
        [Validators.required, Validators.maxLength(30)],
      ],
      major: [this.profile.major, Validators.required],
      grade: [this.profile.grade, Validators.required],
    });
  }
  loadProfile() {
    this.userS.getUserInfo().subscribe((res: UserInfo) => {
      this.profile = res;
      // console.log(res);
      this.buildForm();
    });
  }
  isSending = false;
  updateStatus: boolean = true;

  onSubmit() {
    this.isSending = true;
    this.profile = Object.assign(
      this.profile,
      this.profileForm.value
    ) as UserInfo;
    let form: UserUpdate = this.profileForm.value;
    console.log(this.profile);
    this.userS.uploadUserInfo(form).subscribe(
      (res) => {
        this.profile = res;
        this.buildForm();
        this.isSending = false;
        this.updateStatus = true;
      },
      (err) => {
        this.isSending = false;
        this.updateStatus = false;
      }
    );
  }
}
