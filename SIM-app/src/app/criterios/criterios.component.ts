import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { CriteriosService } from '../criterios/criterios.service';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent implements OnInit {

constructor(private criteriosService: CriteriosService) {}

   criterios: string[];
   criterioDuplicado : boolean = false;

   criarCriterio(criterio: string): void {
     this.criteriosService.criar(criterio)
        .then(ab => {
           if (ab) {
              this.criterios.push(ab);
           } else {
              this.criterioDuplicado = true;
           }
        })
        .catch(erro => alert(erro));
   }

    deletarCriterio(criterio: string): void {
      this.criteriosService.deletar(criterio)
      .then(ab => {
         if (ab) {
            var result: string = this.criterios.find(k => k == criterio);
            this.criterios.splice(this.criterios.indexOf(result), 1);
         }
      })
      .catch(erro => alert(erro));
     }

     ngOnInit(): void {
      this.criteriosService.getCriterios()
         .then(criterios => this.criterios = criterios)
         .catch(erro => alert(erro));
    }

    onMove(): void {
      this.criterioDuplicado = false;
   }
}
