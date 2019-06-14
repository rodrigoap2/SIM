Feature:As professor 
	I Want to verificar o desempenho dos alunos na disciplina,
	So that eu possa identificar os pontos fracos dos meus alunos.

Scenario: Geração de relatório com sucesso
Given eu estou na página de relatórios
Given o critério "Uso de pacotes" foi cadastrado com peso caracterizado como "1"
Given o critério "Uso de herança" foi cadastrado com peso caracterizado como "3"
Given o aluno "João Silva" foi cadastrado com login "js6"
Given o aluno "Leonardo Ramos" foi cadastrado com login "lr2"
Given a nota do aluno "João Silva" para o critério "Uso de pacotes" foi cadastrada como "7"
Given a nota do aluno "João Silva" para o critério "Uso de herança" foi cadastrada como "5"
Given a nota do aluno "Leonardo Ramos" para o critério "Uso de pacotes" foi cadastrada como "7"
Given a nota do aluno "Leonardo Ramos" para o critério "Uso de herança" foi cadastrada como "9"
Given o campo "Média de notas do critério Uso de pacotes" está como "null"
Given o campo "Media de notas do critério Uso de herança" está como "null"
Given o campo "Media de notas" está como "null"
When eu gero um relatório
Then eu visualizo o campo "Média de notas" como "8"
Then eu visualizo o campo "Média de notas do critério Uso de pacotes" como "7"
Then eu visualizo o campo "Media de notas do critério Uso de herança" como "7"