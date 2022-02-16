import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  // Aqui creamos el formulario
  form1 = this.fb.group({
    IdPersona: [, [Validators.required]],
    Documento: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    Nombres: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    Apellidos: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    Telefono: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    Correo: ['', [Validators.required, Validators.minLength(2)]],
    Direccion: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
  });
  // Data de ultimos posteos
  data: any=[];
  // Variable para el control del envio del formulario
  formularioEnviado = false;

  // Aquí se inyecta el FormBuilder y el HttpClient
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  // Función utilizada para postear
  crearPersona() {
    console.log(this.form1);
    this.formularioEnviado=true;
    // Se valida si es formulario es invalido, si es inválido termina la funcion
    if (this.form1.invalid) {
      return;
    }

    // Se consume la api y s elleva a cabo el metodo post
    this.http
      .post(`http://190.60.101.59:6003/api/Personas`, this.form1.value)
      .subscribe(
        (resp) => {
          // Nos subscribimos al observable del post y en la consola muestro la respuesta de la api 
          console.log('Post enviado:', resp);
          this.data.push(this.form1.value)
          // Se intala libreria sweetalert para creacion satisfactoria
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${this.form1.value.Nombres} creado exitosamente`,
            showConfirmButton: false,
            timer: 1500
          });
          this.form1.reset();
    this.formularioEnviado=false;

      
        },
        (err) => {
          // Imprimimos el error en caso de que falle el post
          console.log(err);
        }
      );
  }
}
