# ⏱️ Cronômetro e Timer Digital Inteligente

Um sistema de temporização duplo dinâmico e interativo que funciona como **Cronômetro Progressivo** e **Timer Regressivo**. O projeto simula a interface física de um cronômetro digital real usando sobreposição absoluta de imagens para LEDs indicadores, efeitos sonoros imersivos por segundo e um sistema avançado de alertas síncronos.

---

## 🚀 Funcionalidades Principais

* **Modo Duplo Interativo:** Alterne entre Cronômetro (Progressivo) e Timer (Regressivo) usando um controle de estados inteligente via Checkbox.
* **Máscara de Tempo "Right-to-Left":** Input de configuração do Timer blindado contra letras/símbolos (`\D` Regex) que empurra os números da direita para a esquerda de forma natural (`00:00:00`).
* **LEDs de Estado com Sobreposição Absoluta:** Gerenciamento visual dinâmico que alterna entre o LED Vermelho (parado) e o LED Verde (rodando) lendo os estilos de forma segura com `window.getComputedStyle`.
* **Sistema de Alarme Robusto:** Alerta audiovisual de 1 minuto ao zerar o Timer que faz os LEDs físicos e o botão de emergência piscarem alternadamente em loop (`somBip.loop = true`).
* **Interrupção Defensiva da Memória:** Proteção de concorrência com `clearTimeout` e `clearInterval` que permite ao usuário frear e limpar o alarme a qualquer momento clicando em Stop ou Reset, sem deixar "fantasmas" na memória do navegador.
* **Feedback Sonoro Imersivo:** Efeito de áudio de clique sutil (`sombop.play()`) executado rigidamente a cada transição de segundo no display.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica para os seletores, tags de áudio nativas e botões de controle físico posicionados sobrepostos.
* **CSS3:** Estilização com a fonte digital `Orbitron`, gerenciamento de opacidade para efeitos visuais e posicionamento estrito com `position: absolute`.
* **JavaScript (ES6+):** * Estruturas assíncronas de tempo combinadas (`setInterval` + `setTimeout`).
  * Conversores matemáticos baseados em resto de divisão (`%`) e arredondamento para baixo (`Math.floor`).
  * Tratamento de strings e formatação de layout com `String.prototype.padStart`.
  * Programação defensiva usando o operador de curto-circuito (`|| 0`) e sanitização via Regex.

---

## 📸 Demonstração Visual

<table>
  <tr>
   <td>
      <p align="center"><b>Animação do Projeto (GIF)</b></p>
      <img src="https://adriano-coutinho-ti.github.io/Timer-Cronometro/OUTROS/foto03.gif" alt="Funcionamento do Alerta" width="300">
    </td>
    <td>
      <p align="center"><b>Visualização do Projeto - TIMER (Foto)</b></p>
      <img src="https://adriano-coutinho-ti.github.io/Timer-Cronometro/OUTROS/foto01.png" alt="Layout do Cronômetro" width="300">
    </td>
   <td>
      <p align="center"><b>Visualização do Projeto - CRONOMETRO (Foto)</b></p>
      <img src="https://adriano-coutinho-ti.github.io/Timer-Cronometro/OUTROS/foto01.png" alt="Layout do Cronômetro" width="300">
   </td>
  </tr>
</table>

---

## 📁 Estrutura de Arquivos

```text
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── audio/
│   │   ├── bip.mp3
│   │   └── bop.mp3
│   ├── img/
│   │   ├── cronometro-base.png
│   │   ├── led-green.png
│   │   └── led-red.png
│   └── js/
│       └── scripts.js
└── README.md
```

---
## 🧠 Arquitetura Lógica do Projeto
1. O Motor do Tempo (setInterval)
Toda a contagem do tempo é centralizada em uma única variável numérica de controle (tempoSegundos). O JavaScript nunca faz contas baseadas no texto da tela. O motor soma ou subtrai 1 deste número a cada 1000ms e depois executa a conversão matemática:

  * **Horas:** Math.floor(tempoSegundos / 3600)
  * **Minutos:** Math.floor((tempoSegundos % 3600) / 60)
  * **Segundos:** tempoSegundos % 60

2. Controle de Ciclo de Vida do Alarme
Para evitar travamentos na tela, o agendamento de 60 segundos do alarme é armazenado na variável global timeoutAlerta. Caso o usuário queira antecipar o fim do bipe, as funções de parada executam o cancelamento imediato do agendamento futuro:
```text
clearTimeout(timeoutAlerta);
```
Desenvolvido com 💜 focado no aprendizado e evolução em engenharia de software.
