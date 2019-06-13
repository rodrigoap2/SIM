Feature:As monitor 
	I Want to criar um critério de avaliação,
	So that eu possa calcular a nota do aluno baseado nos critérios.

Scenario: Cadastro de critérios
Given eu estou na página de cadastro de critérios
When eu cadastro o critério "Uso de pacotes" com peso caracterizado como "1" 
When eu cadastro o critério "Uso de herança" com peso caracterizado como "2" 
Then eu vejo "Uso de pacotes" como critério com peso "1"
Then eu vejo "Uso de herança" como critério com peso "2"
