import { Criterio } from '../SIM-app/src/app/criterios/criterio';
export class CadastroCriterios {
  criterios: string[] = [];

  criar(criterio: string): string {
    var result = null;
    if (this.criterioNaoCadastrado(criterio)) {
      result = criterio;
      this.criterios.push(result);
    }
    return result;
  }

  deletar(criterio: string): boolean {
    var result: string = this.criterios.find(a => a == criterio);
    var saida: boolean = false;
    if (result){
      this.criterios.splice(this.criterios.indexOf(result), 1);
      saida = true;
    } 
    return saida;
  }

  atualizar(criterio: Criterio): void{

  }

  criterioNaoCadastrado(criterio: string): boolean {
     return !this.criterios.find(a => a == criterio);
  }

  getCriterios(): string[] {
    return this.criterios;
  }
}

