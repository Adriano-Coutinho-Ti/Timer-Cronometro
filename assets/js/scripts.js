// Estou criando as variáveis LET que vai receber os valores que vamos manipular a baixo.
let cron;
let tempoSegundos = 0;
let linhaTempo = document.querySelector(".linha-tempo");
let intervaloAlerta = null;
let timeoutAlerta = null;

//Estou criando as variáveis CONST que vai buscar as informaçoes no HTML e 2 de áudio.
const playButton = document.querySelector(".play");
const resetButton = document.querySelector(".reset");
const stopButton = document.querySelector(".stop");
const alertButton = document.querySelector(".alert");
const ledGreen = document.querySelector(".cronometro-led-green");
const ledRed = document.querySelector(".cronometro-led-red");
const checkbox = document.querySelector(".checkbox");
const inputTimer = document.querySelector(".input-Timer");
const somBip = new Audio("./assets/audio/bip.mp3");
const sombop = new Audio("./assets/audio/bop.mp3");


//Está função é responsavel por parar o alarme do TIMER (o Regressivo) deposis dele zerar.
function finalizarAlertaManualmente() {
    //Estou  usando o CLEAR no INTERVAL e no TIMEOUT, assim vou parar eles.
    clearInterval(intervaloAlerta);//responsavel por fazer os LED piscar e fazer p botao tambem pistar.
    clearTimeout(timeoutAlerta); //Responsavel por parar o TIMEUOT de 1 minuto = 60000ms.

    //Vamos fazer o REST para Limpar e depois deixar o inputTimer disabled e voltar o timeoutAlerta para NULL.
    reset();
    inputTimer.disabled = true;
    timeoutAlerta = null;

    //Vamos Silencia e reseta o áudio do bip.
    somBip.pause();
    somBip.currentTime = 0; 

    //Estou devolvendo os componentes da tela para o estado normal.
    ledRed.style.display = "block";
    ledGreen.style.display = "none";
    checkbox.disabled = false;
    checkbox.checked = false;
    playButton.style.display = "block";
    resetButton.style.display = "block";
    stopButton.style.display = "block";
    alertButton.style.display = "none";
    //console.log("Alerta de 1 minutos segundos Parada!"); Apenas para teste no CONSOLE.LOG
}
//Está função é onde o alarme do TIMER acontece.
function dispararAlerta() {
    // Vamos iniciar o BIP e fazer ele ficar em LOOP.
    somBip.play();
    somBip.loop = true;
    alertButton.style.display = "block";//Vou mostar o Button que vai ficar piscando.
    resetButton.style.display = "none";//Remover o button do RESET.

    // Inicia o motor do "pisca-pisca" (alterna a cada 400 milissegundos).
    intervaloAlerta = setInterval(() => {
        
        // Verificamos se o LED vermelho está aparecendo na tela / estamos garantido isso, pois estamos validando a tela tambem.
        if (ledRed.style.display === "block" || window.getComputedStyle(ledRed).display === "block") {
            // Se o vermelho está ativo: esconde ele e mostra o verde e o button fica escondido.
            ledRed.style.display = "none";
            ledGreen.style.display = "block";
            alertButton.style.opacity = 0;
        } else {
            // Se o verde está ativo: esconde ele e mostra o vermelho e o button fica levemente aparecendo para piscar.
            ledGreen.style.display = "none";
            ledRed.style.display = "block";
            alertButton.style.opacity = 0.2;
        }

    }, 400);//400 milissegundos.

    // O DESLIGAMENTO AUTOMÁTICO: Após 1 Minuto, para o alerta.
    timeoutAlerta = setTimeout(() => {
        finalizarAlertaManualmente();
        //console.log("Alerta de 10 minutos finalizado!"); Apenas para teste no CONSOLE.LOG.
    }, 60000); // 60000ms = 1 minuto cravados.
}

//Está é a Função STOP, tem o nome com s no final para evitar erros no código.
function stops() {
    clearInterval(cron)//Para o Cronometro.
    playButton.style.display = "block";//Ativa o Play.
    ledRed.style.display = "block";//Ativa o LED RED.
    ledGreen.style.display = "none";//Apaga o LED GREEN.
    if (timeoutAlerta != null) {//se estiver fora do TIMER ele limpa as informações.
        finalizarAlertaManualmente()
        inputTimer.value = "00:00:00";//limpa a tela do cronometro.
    }
}

//Está é a função de RESET e nela vamos limpas as informações da tela.
function reset() {
    clearInterval(cron)//Para o cronometro.
    tempoSegundos = 0;//Retorna o tempo para 0.
    linhaTempo.innerHTML = `00:00:00`;//coloca na tela o valor 00:00:00.
    playButton.style.display = "block";//Ativa o Play.
    ledRed.style.display = "block";//Ativa o LED RED.
    ledGreen.style.display = "none";//Apaga o LED GREEN.
    if (checkbox.checked === true) {//verifica se está no TIMER ativado .
        inputTimer.disabled = false; // Habilita o input para digitação.
        inputTimer.value = `00:00:00`;//limpa a tela do cronometro.
        inputTimer.focus();//faz ele ficar em foco.
    }

}

//Está é e função de START, vamos trabalhar.
function star() {
    playButton.style.display = "none";//Remover o PLAY da tela.
    ledRed.style.display = "none";//Apagar o LED RED.
    ledGreen.style.display = "block";//Ativar o LED GREEN.

    cron = setInterval(() => {//colocamos o SETINTERVAL na varial CRON para poder manipular ela depois.
        
        if (checkbox.checked === true) {//Vamos verificar se estamos no TIMER ou CRONOMETRO, se tiver no TIMER VAMOS RODAR.
            tempoSegundos--//Remover o Tempo 1 segundo por vez.
            if (tempoSegundos < 0) { //Limite de tempo no TIMER, 0 ele para.
                stops()//Limpa para garantir .
                playButton.style.display = "none";
                checkbox.disabled = true
                dispararAlerta()//Dispara o alarme.
                return;// Para a função aqui
            }
        } else {//Se for Cronometro
            inputTimer.value = "00:00:00";//Lipar a tela antes de tudo.
            tempoSegundos++//adicionado 1 segundo por vez.
            
            if (tempoSegundos >= 359999) {//Limite máximo de tempo permitido quando chegar ele para 99:59:59.
                stops()//Para tudo.
                return;// Para a função aqui
            }
        }
        //Vamos fazer apreparação dos seguindos nos formatos de HH:MM:SS.
        let horas = Math.floor(tempoSegundos / 3600); //EX: 0 / 3600 = 0.
        let minutos = Math.floor((tempoSegundos % 3600) / 60); //EX: 0 % 3600 = 0 -> 0 / 60 = 0.
        let segundos = tempoSegundos % 60; //EX: 0 % 60 = 0.

        // Agora Transformar em texto e dar o "banho" de zeros à esquerda.
        // O padStart só funciona em TEXTO (String), por isso usamos o String() antes.
        let horasFormatadas = String(horas).padStart(2, "0"); // "0" vira "00"
        let minutosFormatados = String(minutos).padStart(2, "0"); // "0" vira "00"
        let segundosFormatados = String(segundos).padStart(2, "0"); // "0" vira "00"

        // No final, juntamos tudo com os dois pontos para injetar no seu HTML.
        linhaTempo.innerHTML = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
        sombop.play();//Som da troca de segundo, para ficar interativo.
    }, 1000);

    inputTimer.disabled = true;//Garante que o inputTimer sempre fique disabled.


}

//Está é a função TIMER que verifica o checkbox para saber se vai ser Timer ou Cronometro.
function timer() {
    if (checkbox.checked === true) {
        reset()// está resetando para evitar que seja ativado o TIMER com o cronometro já rodando.
        //console.log("Modo Regressivo Ativado!") Apenas para teste no CONSOLE.LOG.
        inputTimer.disabled = false; // Habilita o input para digitação.
        inputTimer.value = "00:00:00";
        inputTimer.focus();          // Já coloca o cursor piscando dentro dele!.
    } else {
        //console.log("Modo Progressivo (Cronômetro) Ativado!")  Apenas para teste no CONSOLE.LOG.
        inputTimer.disabled = true;  // Desabilita o input (o usuário não consegue digitar).
        inputTimer.value = "";       // limpa o que estava digitado.
        reset()//está resetando para limpar os dados da tela e voltar para o cronometro.
    }
}
//Estamos fazendo a mascara do  INPUT e vamos usar o EVENT (que sera o INPUT no momento da interação).
function formatInputAsValue(event) {
    
    let value = event.target.value;//Pega o texto atual do input.

    value = value.replace(/\D/g, "");//Limpa tudo o que não for número (\D seleciona tudo que nao for números e troca por "").

    //Trata o campo vazio: se o usuário apagar tudo, reseta para o visual padrão.
    if (value === "") {
        event.target.value = "00:00:00";
        return; // Para a função aqui.
    }

    //Se o usuário digitar mais de 6 números, mantém apenas os últimos 6 digitados.
    // Isso faz os números "andarem" para a esquerda conforme ele digita!.
    if (value.length > 6) {
        value = value.slice(-6);
    }

    value = value.padStart(6, "0");//Garante que a string tenha sempre 6 caracteres completando com zeros à esquerda.

    //FATIAMENTO: Corta a string em 3 pedaços de 2 dígitos.
    let horas = value.slice(0, 2);// Pega os índices 0 e 1.
    let minutos = value.slice(2, 4);// Pega os índices 2 e 3.
    let segundos = value.slice(4, 6);// Pega os índices 4 e 5.

    //Junta os pedaços com os dois pontos e joga de volta na tela do usuário.
    event.target.value = `${horas}:${minutos}:${segundos}`;

    //vamos prerar estes valores para colocar variável global tempoSegundos.
    //vai pegar o texto e fazer virar numero || ou colcoar 0 no ludar para evitar o sistema quebrar.
    let numHoras = parseInt(horas) || 0;
    let numMinutos = parseInt(minutos) || 0;
    let numSegundos = parseInt(segundos) || 0;

    //Transformamos tudo em segundos puros e guardamos na variável global.
    tempoSegundos = (numHoras * 3600) + (numMinutos * 60) + numSegundos;

    //Agora vamos preparar para jogar na tela.
    let horasFormatadas = String(horas).padStart(2, "0"); // "0" vira "00".
    let minutosFormatados = String(minutos).padStart(2, "0"); // "0" vira "00".
    let segundosFormatados = String(segundos).padStart(2, "0"); // "0" vira "00".

    // No final,está tudo com os dois pontos para injetar no seu HTML.
    linhaTempo.innerHTML = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;

    
}

//Estes são os 2 eventos que vamos usar.
 checkbox.addEventListener("change", timer)//Vamos ficar de olho no checkbox.
 inputTimer.addEventListener("input", formatInputAsValue)//Vamos ficar de olho no Input.