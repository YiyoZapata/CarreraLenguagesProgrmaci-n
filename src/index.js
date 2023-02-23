let lenguages = Array.from(document.querySelectorAll(".lenguage")); //Recoge todos los logos
const startButton = document.querySelector("button.start");
const resetButton = document.querySelector("button.reset");

const MAX_PIXEL_INCREMENT_X = 10; //pixel

const META = 850; //pixel
const TIEMPO_ITERACION = 50; //milisegundos

//Posiciona
const initGame = () => {
  lenguages = Array.from(document.querySelectorAll(".lenguage"));
  lenguages.forEach((lenguage) => {
    const positionX = -35;
    lenguage.style.setProperty("--x", `${positionX}px`); //Vuelve a poner a los logos a la posición de salida
    lenguage.style.setProperty("--y", 0);
    lenguage.classList.remove("empate");
    lenguage.classList.remove("ganador"); //Retira las clases de css cuando vuelve a iniciar el juego
    lenguage.classList.remove("perdedor");
  });
};

//Comprobar que algien ha llegado a la meta, si supera la posición del tablero del juego
const isAnyWinner = () => {
  // La función some() devuelve un true o false si se ha modificado el array que devuelve
  // si un logo supera  la meta "positionX" es true
  return lenguages.some((lenguage) => {
    const positionX = Number.parseInt(lenguage.style.getPropertyValue("--x"));
    return positionX > META; // La constante meta es el maximos de pixels que hay en la zona de juego
  });
};

//filtra el que ha llegado a la meta
const finishGame = () => {
  const ganador = lenguages.filter((lenguage) => {
    const positionX = Number.parseInt(lenguage.style.getPropertyValue("--x"));
    return positionX > META;
  });
  //Con el nuevo array que devuelve filter del ganador o empates deduzco las condiciones de cada uno
  console.log(ganador);
  //Ganador
  if (ganador.length === 1) {
    const lenguajeGanador = ganador[0]; //Si el largo del array es de un solo elemento entonces es el ganado
    lenguajeGanador.classList.add("ganador"); //y le asigno una clase de css llamada ganador para que le de sombras amarillas
  }
  //Empate
  if (ganador.length > 1) {
    ganador.forEach((lenguage) => lenguage.classList.add("empate")); //Si el nuevo array tiene más de un elemento entonces es empate
    //por lo que le asigno otra clase de css que los rota para destacarlos
  }
  //Perdedor
  lenguages.forEach((lenguage) => {
    const esganador = lenguage.classList.contains("ganador"); //si contienen la clase ganador o empate es que es el perdedor
    const esempate = lenguage.classList.contains("empate"); // y le asigno una clase css que le da escala de grises
    const elperdedor = !esganador && !esempate;
    if (elperdedor) {
      lenguage.classList.add("perdedor");
    }
  });
};

//Incrementa, es dicir hace que se mueva de manera aleatoria
const iterationGame = () => {
  lenguages.forEach((lenguage) => {
    const positionX = Number.parseInt(lenguage.style.getPropertyValue("--x"));
    const positionY = Number.parseInt(lenguage.style.getPropertyValue("--y"));
    //console.log(positionX);
    const incrementoX = Math.floor(Math.random() * MAX_PIXEL_INCREMENT_X); //random * 10
    const incrementoY = -2 + Math.floor(Math.random() * 5);//efecto de movimientos arriba y abajo
    lenguage.style.setProperty("--x", `${positionX + incrementoX}px`);
    lenguage.style.setProperty("--y", `${positionY + incrementoY}px`);
    /* la const incrementX generará un número aleatorio entero entre 0 y 4 (ambos incluidos). Luego, se le sumará -2 a este número generado.
    Por lo tanto, los números que se pueden obtener son:
    
        2 (cuando se genera 0)
      -1 (cuando se genera 1)
        0 (cuando se genera 2)
        1 (cuando se genera 3)
        2 (cuando se genera 4)*/
  });
  //antes de hacer una iteración hace la comprobación
  if (!isAnyWinner()) {
    setTimeout(iterationGame, TIEMPO_ITERACION);// ejecuta esa función según el tiempo que le pasemos (tiempo_iteraccion)
  } else {
    finishGame();
  }
};

//Ejecuta el juego.
const startGame = () => {
  console.log("Empieza el juego.");
  iterationGame();
};

//Si hace click en startButton ejecuta startGame
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", initGame);

initGame();
