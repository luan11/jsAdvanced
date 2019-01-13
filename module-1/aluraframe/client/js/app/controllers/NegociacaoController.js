class NegociacaoController {

	constructor(){	
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQtd = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(), 
			new NegociacoesView($('#negociacoesView')), 
			'adiciona', 'esvazia');

		this._mensagem = new Bind(
			new Mensagem(), 
			new MensagemView($('#mensagemView')), 
			'texto');
	}

	adiciona(event){
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto = 'Negociação adicionada com sucesso!';
		this._limpaForm();
	}

	importaNegociacao(){
		let service = new NegociacaoService();

		service.obterNegociacoesDaSemana()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
				this._mensagem.texto = 'Negociações da semana obtida com sucesso!';
			})
			.catch(err => this._mensagem.texto = err);

		service.obterNegociacoesDaSemanaAnterior()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
				this._mensagem.texto = 'Negociações da semana obtida com sucesso!';
			})
			.catch(err => this._mensagem.texto = err);

		service.obterNegociacoesDaSemanaRetrasada()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
				this._mensagem.texto = 'Negociações da semana obtida com sucesso!';
			})
			.catch(err => this._mensagem.texto = err);
		
		/* service.obterNegociacoesDaSemana((err, negociacoes) => {
			if(err){
				this._mensagem.texto = err;
				return;
			}

			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

			service.obterNegociacoesDaSemanaAnterior((err, negociacoes) => {
				if(err){
					this._mensagem.texto = err;
					return;
				}
	
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				
				service.obterNegociacoesDaSemanaRetrasada((err, negociacoes) => {
					if(err){
						this._mensagem.texto = err;
						return;
					}
		
					negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso!';
				});
			});
		}); */
	}

	apaga(){
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas com sucesso';
	}

	_criaNegociacao(){
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQtd.value,
			this._inputValor.value
		);
	}

	_limpaForm(){
		this._inputData.value = '';
		this._inputQtd.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}
}