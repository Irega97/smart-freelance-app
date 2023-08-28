// Class for custom forms validations

import { FormGroup, FormControl } from '@angular/forms';

export class Validator {

  static validUsername(group: FormGroup) {
    if (group.parent != undefined) {
      if (group.value == group.parent.value.checkusername) {
        return { validUsername: true };
      } else {
        return null;
      }
    }
    return null;
  }

  static validEmail(group: FormGroup) {
    if (group.parent != undefined) {
      if (group.value == group.parent.value.checkemail) {
        return { validEmail: true };
      } else {
        return null;
      }
    }
    return null;
  }

  static checkFecha(group: FormGroup) {
    let finIns: Date = new Date(group.value.finInscripcion);
    let inicio: Date = new Date(group.value.fechaInicio);
    finIns = new Date(finIns.setHours(23, 59, 59, 999));
    inicio = new Date(inicio.setHours(0, 0, 0, 0));
    if (inicio < finIns) {
      return { checkFecha: true };
    } else {
      return null;
    }
  }

  // static checkPlayers(group: FormControl){
  //   if (group.value % 4 != 0)
  //     return ({checkPlayers:true});

  //   else
  //     return null;
  // }
}
