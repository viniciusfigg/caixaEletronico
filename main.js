//Sistema bancário

class Pessoa{
	constructor(nome,telefone){
		this.nome = nome
		this.telefone = telefone
	}
	getNome(){
		return this.nome;
	}

	getTelefone(){
		return this.telefone;
	}

	setNome(){
		let documento=
		confirm("O docomumento com autorziação judicial foi anexado?");

		if(documento){
			this.nome = prompt("Digite o novo nome:")
		}
	}

	setTelefone(){
		this.telefone = prompt("Informe o novo telefone");
	}
}

class PessoaFisica extends Pessoa{
	constructor(nome,telefone,cpf){
		super(nome,telefone);
		this.cpf = cpf;
	}
	getNome(){
		super.getNome();
	}
	getTelefone(){
		super.getTelefone();
	}
}

class PessoaJuridica extends Pessoa{
	constructor(nome,telefone,cnpj){
		super(nome,telefone);
		this.cnpj = cnpj;
	}
	getNome(){
		super.getNome();
	}
	getTelefone(){
		super.getTelefone();
	}
}

class ContaPF extends PessoaFisica{
	constructor(nome,telefone,cpf,conta){
		super(nome,telefone,cpf);
		this.saldo = 0;
		this.conta = conta;
		this.agencia = "0001";
		this.tipo = 1;
	}
	getNome(){
		super.getNome();
	}
	getTelefone(){
		super.getTelefone();
	}
	getCpf(){
		return super.cpf;
	}
	getSaldo(){
		return this.saldo;
	}
	getConta(){
		return this.conta;
	}
	getAgencia(){
		return this.agencia;
	}
	setCpf(){
		alert("Impossível trocar o CPF!");
	}
	deposita(valor){
		let senha = prompt("Digite a senha do gerente/caixa:")

		if(senha = "123456"){
			this.saldo += valor;
		} else {
			alert("Apenas gerente/caixa realiza deposito!")
		}
	}
	saca(valor){
		if(this.saldo>valor){
			this.saldo -= valor;
			alert("Saque efetuado com sucesso");
		}else{
			alert("Saldo insuficiente");
		}
	}

}

class ContaPJ extends PessoaJuridica{
	constructor(nome,telefone,cnpj,conta){
		super(nome,telefone,cnpj);
		this.saldo = 0;
		this.conta = conta;
		this.agencia = "0001";
		this.tipo = 2;
	}
	getCnpj(){
		return super.cnpj;
	}

	getSaldo(){
		return this.saldo;
	}
	getConta(){
		return this.conta;
	}
	getAgencia(){
		return this.agencia;
	}
}

class Usuario{
	constructor(nome,cargo){
		this.nome= nome;
		this.cargo = cargo;
	}
}
// o sistema bancário deverá ter login de caixa e gerente
// o usuário pode consultar as contas cadastradas
// o usuário pode fazer saques e depósitos
// gerente pode fechar e abrir contas.

///////// variáveis Globais
var user;

const contas = ["vazio"];
var ncontas = 1;

///////// Estilos globais
document.getElementById("menu").style.display = "none";
document.getElementById("exibeConsultas").style.display = "none";
document.getElementById("cadastraconta").style.display = "none";
document.getElementById("excluiconta").style.display = "none";


/////// Métodos
function exibeLogin(){
	document.getElementById("login").style.display = "block";
	document.getElementById("menu").style.display = "none";
	document.getElementById("exibeConsultas").style.display = "none";
	document.getElementById("cadastraconta").style.display = "none";
	document.getElementById("excluiconta").style.display = "none";
}

function login(){
	let u = document.getElementById('usuariotxt').value;
	let c = document.getElementById('cargoselect').value;

	user =  new Usuario(u,c);

	document.getElementById('login').style.display = "none";
	document.getElementById("menu").style.display = "block";
	if(u == ""){
		alert("Usuário Inválido");
		exibeLogin();
	}else{
		if(c == "2"){
			document.getElementById("abrecontalnk").style.display = "none";
			document.getElementById("fechacontalnk").style.display = "none";
		} else {
			document.getElementById("abrecontalnk").style.display = "inline-block";
			document.getElementById("fechacontalnk").style.display = "inline-block";
		}
	}
}

function tipoConta(){
	let tipo = document.getElementById("tipoconta").value;
	if(tipo === "pf"){
		document.getElementById('cpfdiv').style.display = "block";
		document.getElementById('cnpjdiv').style.display = "none";
	} else {
		document.getElementById('cpfdiv').style.display = "none";
		document.getElementById('cnpjdiv').style.display = "block";
	}
}

function addConta(){
	document.getElementById("exibeConsultas").style.display = "none";
	document.getElementById("excluiconta").style.display = "none";
	document.getElementById("cadastraconta").style.display = "block";
	document.getElementById('cpfdiv').style.display = "none";
	document.getElementById('cnpjdiv').style.display = "none";
	document.getElementById('contatxt').value = ncontas;
}

function cadastrarConta(){
	let nome = document.getElementById('nometxt').value;
	let tel = document.getElementById('teltxt').value;
	let documento;

	if(document.getElementById("tipoconta").value == "pf"){
		documento = document.getElementById("cpftxt").value;
		contas.push(new ContaPF(nome,tel,documento,ncontas))
	}else{
		documento = document.getElementById("cnpjtxt").value;
		contas.push(new ContaPJ(nome,tel,documento,ncontas))
	}

	ncontas++;
	document.cadconta.reset();
	addConta();
	
}
	
function consultaConta(){
	document.getElementById("excluiconta").style.display = "none";
	document.getElementById("exibeConsultas").style.display = "block";
	document.getElementById("cadastraconta").style.display = "none";
	let consultas = document.getElementById('exibeConsultas');
	consultas.innerHTML = "<br/>";
	for(let i = 1; i < contas.length; i++){

		consultas.innerHTML += "Agência: " + contas[i].agencia;
		if(contas[i].tipo == 1){
			consultas.innerHTML += " Conta (PF): " + contas[i].conta + "<br/>";
		} else {
			consultas.innerHTML += " Conta (PJ): " + contas[i].conta + "<br/>";
		}
		consultas.innerHTML += "Nome: " + contas[i].nome + "<br/>";
		consultas.innerHTML += "Telefone: " + contas[i].telefone + "<br/>";
		if(contas[i].tipo == 1){
			consultas.innerHTML += "CPF: " + contas[i].cpf + "<br/>";
		} else {
			consultas.innerHTML += "CNPJ: " + contas[i].cnpj + "<br/>";
		}
		consultas.innerHTML += "SALDO: " + contas[i].saldo + "<br/><br/><hr/><br/><br/>";

	}

}
function achaNome(){
	document.getElementById("nomeexcluitxt").value = 
	contas[document.getElementById("escolheexcluir").value].nome;
}

function removeConta(){
	document.getElementById("excluiconta").style.display = "block";
	document.getElementById("cadastraconta").style.display = "none";
	document.getElementById("exibeConsultas").style.display = "none";
	let op = document.getElementById("escolheexcluir");
	let string = " ";

	for(let i = 1; i<contas.length; i++){
		string +="<option value='"+contas[i].conta+"'>"+contas[i].conta + "</option>";			
	}
	op.innerHTML = string;
}

function excluirConta(){
	contas.splice(Number(document.getElementById("escolheexcluir").value),1);
	document.excluicontaform.reset();
	alert("Conta Exclúida com sucesso!")
}

function saca(){
	document.getElementById("exibeConsultas").style.display = "none";
	document.getElementById("cadastraconta").style.display = "none";
}

function deposita(){
	document.getElementById("exibeConsultas").style.display = "none";
	document.getElementById("cadastraconta").style.display = "none";
}

