import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: []
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  // tslint:disable-next-line: typedef
  guardar(form: NgForm) {

    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }

    // Marca error, pero funciona, si no fuera por el allowOutside, no marcaria error.
    Swal.fire(
      'Espere',
     'Guardando informacion',
      'info',
    );

    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.heroe.id) {

      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe(resp => {
      Swal.fire(
        this.heroe.nombre,
        'Se actualizó el registro',
        'success'
      );
    })
  }
}
