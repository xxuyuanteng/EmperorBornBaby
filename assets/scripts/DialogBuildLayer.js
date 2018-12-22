
var Utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        mArmyNameLabel: cc.Node,
        mArmyAttack: cc.Node,
        mArmyCount: cc.Node,
        mArmyCost: cc.Node,
    },


    onLoad () {
        console.log("Utils.mSelecteArmyType:");

    },

    clickBtn:function(event, customData){
        if(customData == "close"){
            this.node.active = false;
        }else if(customData == "build"){
            this.node.active = false;
            console.log("建造成功...");
        }
    },

    start () {
        console.log("start...Utils.mSelecteArmyType:" + Utils.mSelecteArmyType);
    },

    // update (dt) {},
});
