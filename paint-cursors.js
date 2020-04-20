var paintCursor = function (cursors, screen, clickX, clickY) {

    context = screen.getContext('2d');

    cursors.forEach((c, i) => {
        context.save();
        context.beginPath();
        context.strokeStyle = "#535c68";
        context.fillStyle = "#95afc0";
        if(c.isWaiting()){
            context.strokeStyle = "#22a6b3";
            context.fillStyle = "#7ed6df";
        }

        else if(c.focusObj){
            context.strokeStyle = "#6ab04c";
            context.fillStyle    = "#badc58";
        }

        //context.rect(clickX + c.offsetX, clickY + c.offsetY,3,3);
        //context.stroke();

        let x = clickX + c.offsetX;
        let y = clickY + c.offsetY;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x, y+6);
        context.lineTo(x+2, y+4);

        context.lineTo(x+8, y+10);
        context.lineTo(x+10, y+8);

        context.lineTo(x+4, y+2);
        context.lineTo(x+6, y);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    });
};