import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../alunos/aluno';
import { AlunoService } from '../alunos/aluno.service';
import { CriteriosService } from '../criterios/criterios.service';
import { Criterio } from '../criterios/criterio';

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css']
})
export class CorrecaoComponent implements OnInit {

constructor(private alunoService: AlunoService, private criterioService: CriteriosService) {}

   alunos: Aluno[];
   criteriosPossiveis: Criterio[];
   temConceitosErrados: boolean = false;
   criteriosErrados: string[];

  atualizarAluno(aluno: Aluno): void {
      this.criteriosErrados = this.verificaConceitos(aluno);
      if(this.criteriosErrados.length == 0){
        this.temConceitosErrados = false;
        this.alunoService.atualizar(aluno);
      }else{
        this.temConceitosErrados = true;
      }
  }

  verificaConceitos(aluno: Aluno): string[]{
    var conceitos: string[] = [];
    for (let key in aluno.criterios) {
      if(aluno.criterios[key] < 0 || aluno.criterios[key] > 10){
        conceitos.push(key);
      }else if(aluno.criterios[key] == ''){
        aluno.criterios[key] = 0;
      }
    }
    return conceitos;
  }

  ngOnInit(): void {
      this.alunoService.getAlunos()
         .then(alunos => this.alunos = alunos)
         .catch(erro => alert(erro));
      this.criterioService.getCriterios()
         .then(criterios => this.criteriosPossiveis = criterios)
         .catch(erro => alert(erro));

  }

  onMove(): void {
      this.temConceitosErrados = false;
  }
}