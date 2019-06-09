import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../alunos/aluno';
import { AlunoService } from '../alunos/aluno.service';
import { CriteriosService } from '../criterios/criterios.service';

@Component({
  selector: 'app-correcao',
  templateUrl: './correcao.component.html',
  styleUrls: ['./correcao.component.css']
})
export class CorrecaoComponent implements OnInit {

constructor(private alunoService: AlunoService, private criterioService: CriteriosService) {}

   alunos: Aluno[];
   criteriosPossiveis: String[];

   atualizarAluno(aluno: Aluno): void {
      this.alunoService.atualizar(aluno);
   }

   ngOnInit(): void {
      this.alunoService.getAlunos()
         .then(alunos => this.alunos = alunos)
         .catch(erro => alert(erro));
      this.criterioService.getCriterios()
         .then(criterios => this.criteriosPossiveis = criterios)
         .catch(erro => alert(erro));
   }
}

