Feature:As professor 
	I Want to verificar o desempenho dos alunos na disciplina,
	So that eu possa identificar os pontos fracos dos meus alunos.

Scenario: Geração de relatório com sucesso
Given o critério "Codigo comentado" foi cadastrado com peso caracterizado como "1"
Given o critério "Uso de exceções" foi cadastrado com peso caracterizado como "3"
Given o aluno "Rafael" foi cadastrado com login "rf6"
Given o aluno "Leonardo" foi cadastrado com login "lr2"
Given a nota do aluno "Rafael" para o critério "Codigo comentado" foi cadastrada como "7"
Given a nota do aluno "Rafael" para o critério "Uso de exceções" foi cadastrada como "5"
Given a nota do aluno "Leonardo" para o critério "Codigo comentado" foi cadastrada como "7"
Given a nota do aluno "Leonardo" para o critério "Uso de exceções" foi cadastrada como "9"
Given eu estou na página de relatórios
Given o campo "Média de notas do critério Codigo comentado" está como "null"
Given o campo "Media de notas do critério Uso de exceções" está como "null"
When eu gero um relatório
Then eu visualizo o campo "Média de notas do critério Codigo comentado" como "7"
Then eu visualizo o campo "Media de notas do critério Uso de exceções" como "7"