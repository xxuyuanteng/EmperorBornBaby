
cc.Class({
    extends: cc.Component,

    properties: {
  
    },


    // onLoad () {},

    start () {

    },

    clickBtn:function(event, customdata){
        if(customdata == "close"){
            this.node.active = false;
        }else if(customdata == "train"){
            this.node.active = false;
        }
    }

});
