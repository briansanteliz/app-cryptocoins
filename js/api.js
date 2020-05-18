class API{
    constructor(key){
        this.key = key;
    }
    async getData(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.key}`
        const res = await fetch(url);
        const datos = await res.json()
        return datos
    }

    async queryData(moneda,criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.key}` 
        
       const query =  await fetch(url);
       const resultado = await query.json();
       return resultado;
    }
   

     
}