Feature:As monitor 
	I Want to calcular a nota do aluno baseado nos critérios,
	So that eu verificar o seu desempenho.
Scenario: Cálculo da média ponderada de um aluno
Given eu estou na página de cadastro de notas
Given o critério "Uso de pacotes" foi cadastrado com peso caracterizado como "2"
Given o critério "Uso de heranca" foi cadastrado com peso caracterizado como "1"
Given o aluno "João Silva" foi cadastrado com login "js6"
When a nota do aluno "João Silva" para o critério "Uso de pacotes" é cadastrada como "10"
When a nota do aluno "João Silva" para o critério "Uso de heranca" é cadastrada como "7"
Then é possível ver o campo "Nota do aluno" como "9"
