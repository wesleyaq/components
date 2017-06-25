
interface CocheBase{
	getModelo(): string;
	getVelocidad(): number;
}


class Coche implements CocheBase{
	/**
	 * color del carro
	 * @type string
	 */
	public color: string;
	/**
	 * Modelo del carro
	 * @type string
	 */
	public modelo: string;
	/**
	 * Veocidad de carro
	 * @type string
	 */
	public velocidad: number;

    /**
     * Agregar modelos de cocher
     * @param any = null modelo datos del modelo
     */
 	constructor(modelo:any = null) {
 		this.color = "Blanco";
 		this.velocidad = 0;

 		if(modelo == null) {
 			this.modelo = "BMW Generico";
 		} else {
 			this.modelo = modelo;
 		}
 	}

 	/**
 	 * retorna el color
 	 */
	public getColor() {
		return this.color;
	}

	/**
	 * Asigna un color
	 * @param string color color
	 */
	public setColor(color: string) {
		this.color = color;
	}

	public getModelo() {
		return this.modelo;
	}

	public setModelo(modelo: string) {
		this.modelo = modelo;
	}
	/**
	 * Velocidad
	 * @return {number} string
	 */
	public getVelocidad():number {
		return this.velocidad;
	}

	public setVelocidad(velocidad: number) {
		this.velocidad = velocidad;
	}

	public acelerar(){
		this.velocidad++;
	}

	public frenar(){
		this.velocidad--;
	}

}

var coche = new Coche("Renault Clio");
var coche_dos = new Coche();
var coche_tres = new Coche();

coche.setColor("Rojo");
coche.acelerar();
coche.acelerar();
coche.acelerar();

console.log("El modelo del coche 1 es: " + coche.getModelo());
console.log("El color del coche 1 es: " + coche.getColor());
console.log("La velociad del coche 1 es: " + coche.getVelocidad());
coche.frenar();
console.log("La velociad del coche 1 despues de frenar es: " + coche.getVelocidad());



coche_dos.setColor("Azul");
coche_tres.setColor("verde");
console.log("El color del coche es: " + coche.getColor());
console.log("El color del coche es: " + coche_dos.getColor());
console.log("El color del coche es: " + coche_tres.getColor());
