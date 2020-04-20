function Cursor(offsetX, offsetY){
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.freezedX = 0;
    this.freezedY = 0;
    this.focusObj = null;
    this.wait = false;
}

Cursor.prototype = Object.assign(Cursor.prototype, {

    getOffsetX : function() { return this.offsetX; },
    setOffsetX : function(offsetX) { this.offsetX = offsetX; return this; },

    getOffsetY : function() { return this.offsetY; },
    setOffsetY : function(offsetY) { this.offsetY = offsetY; return this; },

    getFreezedX : function() { return this.freezedX; },
    setFreezedX : function(freezedX) { this.freezedX = freezedX; return this; },

    getFreezedY : function() { return this.freezedY; },
    setFreezedY : function(freezedY) { this.freezedY = freezedY; return this; },

    getFocusObj : function() { return this.focusObj; },
    setFocusObj : function(focusObj) { this.focusObj = focusObj; return this; },

    isWaiting : function() {return this.wait },

    freeze : function(obj, clickX, clickY) {
        this.wait = true;
        this.setFreezedX(this.offsetX + clickX)
            .setFreezedY(this.offsetY + clickY)
            .setFocusObj(obj);
    },

    free : function() {
        this.setFreezedX(0)
            .setFreezedY(0)
            .setFocusObj(null)
            .wait = false;
    },

    collidesWith : function(t, clickX, clickY) {

        return (clickY + this.offsetY >= t.top() &&
            clickY + this.offsetY <= t.bottom() &&
            clickX + this.offsetX >= t.left() &&
            clickX + this.offsetX <= t.right());
    }

});