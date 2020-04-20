var paintTargets = function (targets, screen) {

    context = screen.getContext('2d');

    targets.forEach((t, i) => {
        context.save();
        context.beginPath();
        context.strokeStyle = '#ffa500';
        context.rect(t.x, t.y, t.w, t.h);
        context.stroke();
        context.restore();
    });
};