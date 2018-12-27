class Negociacao {

	constructor(data, qtd, valor){
		this._data = new Date(data.getTime());
		this._qtd = qtd;
		this._valor = valor;
		Object.freeze(this);
	}

	get volume(){
		return this._qtd * this._valor;
	}

	get data(){
		return new Date(this._data.getTime());
	}

	get qtd(){
		return this._qtd;
	}

	get valor(){
		return this._valor;
	}
}