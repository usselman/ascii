//const density = '        .:░▒▓█'
const density = ' .░▒▓█'
//const density = ' ❤🧡💛💙▒▓█'
//const density = ' .:░▒▓█'
//const density = '     .tiITesgESG'
  //const density = ' 😀'


  //let geist;
  let video
  let asciiDiv
  let playing = false
  let button

  function preload() {
  //  geist = loadImage("geist.png")
  //video = createVideo('assets/05.mov', vidLoad)
}

function vidLoad() {
  video.loop()
    video.volume(0)
}

function setup() {
  noCanvas()

    video = createCapture(VIDEO)
    //video = createVideo('assets/01.mp4');

    button = createButton('play');
  button.mousePressed(toggleVid);
  video.size(256, 160)
    //video.size(160, 160);
    asciiDiv = createDiv();
}

function toggleVid() {
  if (playing) {
    video.pause();
    button.html('play');
  } else {
    video.loop();
    button.html('pause');
  }
  playing = !playing;
}

function draw() {
  background(0);

  video.loadPixels()
  let asciiImage = ''

  //pixelarray
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i+j*video.width) * 4;
      const r = video.pixels[pixelIndex + 0]
      const g = video.pixels[pixelIndex + 1]
      const b = video.pixels[pixelIndex + 2]
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      
      const darkest = density[density.length-1]
      const light = density[density.length-2];
      const lightest = density[0];
      const emoji = density[1];
      const c = density.charAt(charIndex)
      if (c === ' ') {
        asciiImage += `<span class='blank'>${'&nbsp;'}</span>`
      //} else if (c === emoji) {
      //  asciiImage += `<span class='emoji'>${c}</span>`
      } else if (c === darkest) {
        asciiImage += `<span class='dark'>${c}</span>`
      } else if (c === light) {
        asciiImage += `<span class='light'>${c}</span>`
      } else if (c === lightest) {
        asciiImage += `<span class='lightest'>${c}</span>`
      } else {
        asciiImage += c;
      }
      

      // references the darkest character in the list
       /*
      //const darkest = density[0];
      // if the current character is the darkest character, wrap it in a span with a class of 'blue'
      if (c === darkest) {
        asciiImage += `<span class='trick'>${c}</span>`
      }*/
    }
    asciiImage += '<br/>'
      //console.log(row)
  }
  asciiDiv.html(asciiImage)
}
