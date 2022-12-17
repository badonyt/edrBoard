
let boxes: string[] = []
let actual_boxes: string[] = []
let intervalId = 0
// main, is composed of two parts
function main(jsond: any) {


  //reads json, creates box. And if needed adds to array 
  document.body.style.background = ''
  for (var key in jsond) {
    if (jsond.hasOwnProperty(key)) {
      console.log(key + " -> " + jsond[key].actual);
      actual_boxes.push(jsond[key].actual.toLowerCase())

      console.log(key)
      if (jsond[key].hasOwnProperty('width') && jsond[key].hasOwnProperty('height')) {
        console.log("w & h")
        crbox(key, true, jsond[key].x, jsond[key].y, jsond[key].width, jsond[key].height)
      } else if (jsond[key].hasOwnProperty('width')) {
        console.log("w")
        crbox(key, true, jsond[key].x, jsond[key].y, jsond[key].width)
      } else if (jsond[key].hasOwnProperty('height')) {
        crbox(key, true, jsond[key].x, jsond[key].y, "100px", jsond[key].height)
      } else {
        crbox(key, true, jsond[key].x, jsond[key].y)
      }


    }
  }
  // every 130ms sees if backround needs to changes
  intervalId = window.setInterval(function () {

    if (localStorage.getItem("color") != null) {
      if (localStorage.getItem("color") == "green") localStorage.setItem('color', "#00b140");
      // @ts-ignore
      document.body.style.background = localStorage.getItem("color");
    } else {
      localStorage.setItem('color', "#00b140")
    }
    // }


  }, 130);


}


// creates box. Based on inputs
function crbox(name: string, add: boolean = true, x: string, y: string, width: string = "100px", height: string = "100px") {
  const div = document.createElement("div");
  div.className = "box";
  div.id = name
  div.innerHTML = "<p style='text-align: center'>" + name + "</p>";
  div.setAttribute(
    'style',
    'position: absolute;left: ' + x + ';top: ' + y + ';width: ' + width + ';height: ' + height + ';',
  );
  //'position: absolute;left: "+x+";top: "+y+";'
  //@ts-ignore
  document.getElementById("maindiv").appendChild(div);
  if (add == true) {
    boxes.push(name)
  }

}
// Sees if theres any boxes if not just call main function. If theres boxes on screen deletes them and then calls main
function readFile(file: any) {
  const reader = new FileReader();
  let result;
  reader.onload = (evt: any) => {
    result = JSON.parse(evt.target.result);

    if (boxes.length == 0) { main(result) } else {
      clearInterval(intervalId);
      let divlol: any = document.getElementById('maindiv');

      while (divlol.firstChild) {
        divlol.removeChild(divlol.firstChild);
      }
      boxes = []
      actual_boxes = []
      main(result)


    }


  };

  reader.readAsText(file);
}
// When user inputs file, calls readfile function
const inputElement: any = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const file: HTMLElement = inputElement.files[0];
  readFile(file)
}


import { listen } from '@tauri-apps/api/event'
// When a key is pressed calls light up to light up the key or the opposite

// @ts-ignore
const unlisten = listen('key-pressed', (event: any) => {
  event.payload = event.payload.toLowerCase()
  //console.log(event.payload.split(""))

  if (event.payload.split("")[0] == "k") {

    event.payload = event.payload.split("")[3]

  } else if (event.payload.split("")[0] == "n") {

    event.payload = event.payload.split("")[3]

  }

  light_up(event.payload)
})
// @ts-ignore
const unlistens = listen('key-released', (event: any) => {
  event.payload = event.payload.toLowerCase()
  if (event.payload.split("")[0] == "k") {

    event.payload = event.payload.split("")[3]

  } else if (event.payload.split("")[0] == "n") {

    event.payload = event.payload.split("")[3]

  } 
  light_down(event.payload)
})
// @ts-ignore
const unlisten_button_pressed = listen('button-pressed', (event: any) => {
  event.payload = "mouse" + event.payload.toLowerCase()
  light_up(event.payload)
})
// @ts-ignore
const unlisten_button_unpressed = listen('button-released', (event: any) => {
  event.payload = "mouse" + event.payload.toLowerCase()
  light_down(event.payload)

})
// lights up box
function light_up(key: string) {
  if (actual_boxes.indexOf(key) != -1) {

    const boesx: any = document.getElementById(boxes[actual_boxes.indexOf(key)])
    boesx.style.backgroundColor = "white"

  }
}
// lights dow the box
function light_down(key: string) {
  if (actual_boxes.indexOf(key) != -1) {
    //@ts-ignore
    const boesx: HTMLElement = document.getElementById(boxes[actual_boxes.indexOf(key)])
    boesx.style.backgroundColor = "grey"

  }
}
