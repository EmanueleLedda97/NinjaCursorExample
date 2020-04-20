function Target(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Target.prototype = Object.assign(Target.prototype, {

    getX : function() { return this.x; },
    setX : function(x) { this.x = x; return this; },

    getY : function() { return this.y; },
    setY : function(y) { this.y = y; return this; },

    getW : function() { return this.w; },
    setW : function(w) { this.w = w; return this; },

    getH : function() { return this.h; },
    setH : function(h) { this.h = h; return this; },

    top : function() { return this.y; },
    bottom : function() { return (this.y + this.h); },
    left : function() { return this.x; },
    right : function() { return (this.x + this.w); }

});