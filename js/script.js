const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 3


const btnEmpezar = document.getElementById('btnEmpezar');
const levelLabel = document.getElementById('level');
var firstTime = true
levelLabel.classList.add('hide')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(() => this.siguienteNivel(), 500)
        
    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
            levelLabel.classList.add('hide')
        } else {
            levelLabel.classList.remove('hide')
            btnEmpezar.classList.add('hide')
        
        }
    }

    generarSecuencia() {
        //Crea un array de 10 digitos con valor 0, luego genera un numero al
        //azar entre 0 y 1 y lo multiplica por 4, luego redondea hacia abajo
        //y el valor lo asigna al array nuevo a travez del map
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(numero) {
        switch (numero) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        //Con el bind hace referencia el boton a la clase Juego
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        console.log(ev)
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel === this.nivel){
                this.nivel++
                levelLabel.innerHTML = `Nivel: ${this.nivel}`
                this.eliminarEventosClick()

                if (this.nivel == ULTIMO_NIVEL + 1){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel,1500) 
                }
            }
        } else {
            this.perdioElJuego()
        }        
    }

    ganoElJuego(){
        swal('Platzi', 'Felicitaciones, ganaste el juego!', 'success')
        .then(this.inicializar())
    }

    perdioElJuego(){
        swal('Platzi', 'Lo lamentamos, perdiste :(', 'error')
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
            levelLabel.innerHTML = `Nivel: ${this.nivel}`
        })
    }
}

function empezarJuego() {

    window.juego = new Juego()
}
