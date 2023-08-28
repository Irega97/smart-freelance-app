import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { Validator } from 'src/app/shared/validator';
import { Components} from 'src/app/shared/components';
import { UserService } from 'src/app/services/web-services/user.service';
import { User, newUser } from 'src/app/models/user';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.page.html',
  styleUrls: ['./register-form.page.scss'],
})
export class RegisterFormPage implements OnInit {

  registerform!: FormGroup;
  user!: User;
  pulsado: Boolean = false;

  constructor(
    private globalDataService: GlobalDataService,
    private components: Components,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      username: ['', [Validators.required, Validator.validUsername]],
      checkusername: [],
      nombre: [''],
      apellidos: [''],
      //image: ['', Validators.nullValidator],
      email: ['', [Validators.email, Validator.validEmail]],
      checkemail: []
    });
  }

  ionViewWillEnter(){
    this.registerform.reset();
    this.pulsado = false;
  }

  register() {
    this.pulsado = true;
    if (this.registerform.invalid){
      return;
    }

    this.components.presentLoading("Conectando...").then(async () => {
      let fullName = this.registerform.value.nombre + " " + this.registerform.value.apellidos;
      const address = await this.globalDataService.getConnectedAddress();
      let user: User = newUser(
        address, 
        this.registerform.value.username,
        this.registerform.value.nombre,
        fullName,
        this.registerform.value.email
      );

      this.userService.createUser(user).subscribe((data: any) => {
        // this.authservicio.addToken(jwt.token);
        // this.events.publish({
        //   "topic":"loginUser"
        // })
        console.log(data);
        this.components.dismissLoading()
        this.router.navigate(['/dashboard/home'], { state: {user: data} });
      }, error => {
        this.components.dismissLoading()
        if (error.status == 409){
          // this.registerform.get('checkusername').setValue(this.registerform.value.username);
          // this.registerform.controls.username.setErrors({validUsername: true});
        }
        else if (error.status == 410){
          // this.registerform.get('checkemail').setValue(this.registerform.value.email);
          // this.registerform.controls.email.setErrors({validEmail: true});
        }
      });
    })
  }
}
