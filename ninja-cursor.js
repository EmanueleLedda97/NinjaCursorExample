window.onload = function () {

    const screen = document.getElementById("screen");
    let ctx = screen.getContext('2d');

    let c1 = new Cursor(0,0);
    let c2 = new Cursor(250,0);
    let c3 = new Cursor(0,250);
    let c4 = new Cursor(250,250);
    let c5 = new Cursor(-250,0);
    let c6 = new Cursor(0,-250);
    let c7 = new Cursor(-250,-250);
    let c8 = new Cursor(250,-250);
    let c9 = new Cursor(-250,250);

    let cursors = [c1, c2, c3, c4/*, c5, c6, c7, c8, c9*/];
    let targets = [];

    for(let i=0; i<7; i++)
        for(let j=0; j<10; j++)
            targets.push(new Target(50+j*90,50+i*90,50,50))

    let activeCursor = null;
    let waitQueue = new Set();

    screen.addEventListener('mousemove', (e) => {

        let x = e.clientX;     // Get the horizontal coordinate
        let y = e.clientY;     // Get the vertical coordinate
        let cw = screen.width;
        let ch = screen.height;
        let boundingBox = screen.getBoundingClientRect();

        x = (x - boundingBox.left) * (cw / boundingBox.width);
        y = (y - boundingBox.top) * (ch / boundingBox.height);

        //console.log(cursors);
        console.log('activeCursor: '+activeCursor);

        checkActiveCursor(x,y);

        waitQueue.forEach((c) => {
            if(c.collidesWith(c.getFocusObj(), x, y)){
                    c.setOffsetX(c.getFreezedX()-x)
                    .setOffsetY(c.getFreezedY()-y);
            }
            else{
                c.free();
                waitQueue.delete(c);
            }
        });

        let foundCollision = false;
        let freeCursors = cursors.filter((value) =>{
            return !(waitQueue.has(value)) && value !== activeCursor;
        });

        freeCursors.forEach((c) => {
            foundCollision = false;
            targets.forEach((t) => {
                if(!foundCollision && !c.isWaiting() && c.collidesWith(t, x, y)) {
                    if(!activeCursor){
                        c.setFocusObj(t);
                        activeCursor = c;
                    }
                    else{
                        c.freeze(t, x, y);
                        waitQueue.add(c);
                    }
                    foundCollision = true;
                }
            });
        });

        ctx.clearRect(0, 0,
            screen.getAttribute('width'),
            screen.getAttribute('height'));

        paintTargets(targets, screen);
        paintCursor(cursors, screen, x, y);
    });

    function checkActiveCursor(x,y) {
        if(activeCursor && !activeCursor.collidesWith(activeCursor.getFocusObj(), x, y) ){

            activeCursor.free();

            if(waitQueue.size !== 0){
                activeCursor = Array.from(waitQueue).pop();
                waitQueue.delete(Array.from(waitQueue).pop());
                checkActiveCursor();
            }
            else
                activeCursor = null;
        }
    }
};