I2B FrontEnd
===

Guia para el desarrollo de los componentes FrontEnd

## Guia de estandar css con con Sass - scss

Los nombre de las class deben se lo mas corto posible para esto usaremos abreviaturas Ej:

```
<button class=”btn”></button>

.btn {
	atributos...
}
```

En el caso de agregarle un atributo variable como el color rojo al componente botón se hara de la siguiente forma:

- -black = Negro
- -white = Blanco
- -red   = Rojo
- -green = Verde
- -grey  = Gris
- -blue  = Azul

```
<button class=”btn -red”></button>

.btn {
	atributos...
	&.-red {
		color: red;
	}
}
```

Para cambiarle el tamaño al botón usaremos las siguiente abreviaturas:

- -sm  = Pequeño
- -md  = Medio
- -lg  = Grande
- -xlg = Extra Grande

```
<button class=”btn -red -md”></button>

.btn {
	atributos...
	&.-red {
		color: red;
	}
	&.-md {
		padding: 10px 15px;
		font-size: 16px;
	}
}
```

En el caso de un hijo, no usar más de 3 niveles:

```
<div class="bar">
  <div class="item">London</div>
  <div class="item">Paris</div>
  <div class="item">Tokyo</div>
</div>

.bar {
	atributos...
	.item {
		atributos...
	}
}
```
