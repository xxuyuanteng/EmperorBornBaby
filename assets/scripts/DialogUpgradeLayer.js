
var Utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {

    },

    clickBtn:function(event, customData){
        if(customData == "close"){
            this.node.active = false;
        }else if(customData == "upgradeHouse"){
            this.node.active = false;
            console.log("升级军营...");
        }else if(customData == "upgradeArmy"){
            this.node.active = false;
            console.log("升级兵种...");
        }
    },

    start () {
    },

    // update (dt) {},
});
