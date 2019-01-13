class ProxyFactory{
	static create(obj, props, act){
		return new Proxy(obj, {
			get(target, prop, receiver){
				if(props.includes(prop) && ProxyFactory._eFuncao(target[prop])){
					return function(){
						Reflect.apply(target[prop], target, arguments);
						return act(target);
					}
				}

				return Reflect.get(target, prop, receiver);
			},

			set(target, prop, value, receiver){
				if(props.includes(prop)){
					act(target);
				}

				return Reflect.set(target, prop, value, receiver);
			}
		});
	}

	static _eFuncao(func){
		return typeof(func) == typeof(Function);
	}
}