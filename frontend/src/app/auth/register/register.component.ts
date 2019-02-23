import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {TitleService} from '../../services/title.service';
import {AuthRegisterModel} from '../auth-data.model';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  accountInfo: FormGroup;
  personalInfo: FormGroup;
  schoolInfo: FormGroup;
  socialInfo: FormGroup;
  states_us: string[] = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'
  ];
  constructor(
    private fb: FormBuilder,
    // private titleService: TitleService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    // this.titleService.setTitle('Register');
    this.accountInfo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.personalInfo = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      personalEmail: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      address: this.fb.group({
        address1: ['', [Validators.required]],
        address2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      }),
      phone: ['', [Validators.required]],
    });

    this.schoolInfo = this.fb.group({
      schoolName: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      }),
      degree: ['', [Validators.required]],
      graduationYear: ['', [Validators.required]],
      schoolYear: ['', [Validators.required]],
      major: ['', [Validators.required]],
      doubleMajor: ['', []],
    });

    this.socialInfo = this.fb.group({
      facebook: ['', []],
      instagram: ['', []],
      linkedin: ['', []]
    });
  }
  submitForm() {
    const a_info = this.accountInfo.value;
    const p_info = this.personalInfo.value;
    const u_info = this.schoolInfo.value;
    const s_info = this.socialInfo.value;
    this.isLoading = true;
    const user: AuthRegisterModel = {
      email: a_info['email'],
      password: a_info['password'],
      firstName: p_info['firstname'],
      lastName: p_info['lastname'],
      birthday: p_info['birthDate'],
      address1: p_info['address']['address1'],
      address2: p_info['address']['address2'],
      city: p_info['address']['city'],
      state: p_info['address']['state'],
      zipCode: p_info['address']['zip'],
      phoneNumber: p_info['phone'],
      personalEmail: p_info['personalEmail'],
      facebook: s_info['facebook'],
      linkedin: s_info['linkedin'],
      instagram: s_info['instagram'],
      schoolYear: u_info['schoolYear'],
      degreeLevel: u_info['degree'],
      graduationYear: u_info['graduationYear'],
      major: u_info['major'],
      major2: u_info['doubleMajor'],
      schoolName: u_info['schoolName'],
      schoolState: u_info['address']['state'],
      schoolCity: u_info['address']['city'],
    };

    this.authService.createUser(user).then((res) => {
      this.isLoading = false;
      if (res['message'] === 'User created!') {
        this.snackBar.open('Та амжилттай бүртгүүлсэн!', 'Done', {
          duration: 3000
        });
        this.router.navigate(['/auth/login']);
      }

    }).catch(() => {
      this.authService.setAuthListener(false);
      this.authService.setLevelListener(0);
      this.isLoading = false;
    });
  }
}
