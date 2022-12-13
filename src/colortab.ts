import { WebviewWindow } from '@tauri-apps/api/window';
//const factor = await appWindow.scaleFactor();
//const size = await appWindow.innerSize();
//const logical = size.toLogical(factor);

const elem:HTMLElement | null =document.getElementById("button_color")
// @ts-ignore
elem.onclick = function() { ColorTab(); };

function ColorTab(){
    //window.open ("./color.html", "mywindow","location=1,status=1,scrollbars=1, width=300,height=300");
    const webview = new WebviewWindow('theUniqueLabel', {
        url: './color.html'
      });

      webview.once('tauri://created', function () {
 console.log("test")
});
}
