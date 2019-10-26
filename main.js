let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bat = new Image();
let bg = new Image();
let fg = new Image();
let pipeN = new Image();
let pipeS = new Image();

bat.src = "img/bat.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeN.src = "img/pipeN.png";
pipeS.src = "img/pipeS.png";

let gap = 55;
let bX = 15;
let bY = 150;
let gravity = 1.2;
let score = 0;

document.addEventListener("touchstart", () => {
    bY -= 24;
});

document.addEventListener("keydown", () => {
    bY -= 24;
});

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y : 0
};

function draw(){
    ctx.drawImage(bg,0,0);

    for( let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeN,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeS,pipe[i].x,pipe[i].y+cvs.height-pipeS.height+gap);
        pipe[i].x--;
        
        if( pipe[i].x == 50) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*(-165))
                
            });
        }
        if( bX + bat.width >= pipe[i].x && bX <= pipe[i].x + pipeN.width && (bY <= pipe[i].y + pipeN.height || bY + bat.height >= pipe[i].y+cvs.height-pipeS.height+gap ) || bY + bat.height >= cvs.height - fg.height) {
            ctx.drawImage(fg,0,cvs.height-fg.height);
            ctx.fillText("Score: "+ score, 10, cvs.height-20);
            cvs.stop();
            
        }
        if( pipe[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bat,bX,bY);
    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+ score, 10, cvs.height-20);
    requestAnimationFrame(draw);
}
draw();