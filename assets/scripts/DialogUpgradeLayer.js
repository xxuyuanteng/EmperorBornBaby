
var Utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        mArmyHouseLabel: cc.Node,   //军营名称
        mArmyCountLabel: cc.Node,   //容量  
        mHouseUpgradeCostLabel: cc.Node,    //升级军营消耗

        mArmyAttackLAbel: cc.Node,  //兵种攻击力    
        mArmyUpgradeCostLabel: cc.Node  //升级兵种消耗
    },


    onLoad () {

    },

    updateUpgradeLayerUI:function(upgradeInfo){
        this.mArmyHouseLabel.getComponent(cc.Label).string = upgradeInfo.name + ":1级";
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
