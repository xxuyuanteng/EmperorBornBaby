
var Utils = require("Utils");

cc.Class({
    extends: cc.Component,

    properties: {
        mStartLayer: cc.Node,
        funcLayerList:{
            default: [],
            type: [cc.Node]
        },
        mSelectLayer: cc.Node,
        mUISpriteAtlas: cc.SpriteAtlas,

        mWarsScrollContent: cc.Node,    //平乱节点滚动区域
        mWarsListDetailLayer: cc.Node,  //平乱详情
        mWarsListLayer: cc.Node,

        mMissionScrollContent: cc.Node, //任务节点滚动区域

        mDialogBuildLayer: cc.Node,     //建造兵营对话框
        mArmyNameLabel: cc.Node,
        mArmyAttack: cc.Node,
        mArmyCount: cc.Node,
        mArmyCost: cc.Node,
        
        mDialogTrainLayer: cc.Node,     //训练兵种对话框

        mDialogUpgradeLayer: cc.Node,    //升级军营和兵种对话框
    },

    onLoad:function() {
        this.initDataInfo();
    },

    initDataInfo:function(){
        var levelCount = Utils.LevelNames.length;
        this.currentBigLevel = 0;
        console.log("关卡数量:", levelCount);
        this.mWarsScrollContent.setContentSize(440, 215 * levelCount);
        for(var i = 0;i < levelCount;i++){
            var itemNode = new cc.Node();
            var itemSp = itemNode.addComponent(cc.Sprite); 
            itemSp.spriteFrame = this.mUISpriteAtlas.getSpriteFrame("bg_common_6");
            itemNode.setContentSize(428, 210);
            itemNode.name = i + "";
            itemNode.setPosition(0, -210 * i - 140);
            this.mWarsScrollContent.addChild(itemNode);
            itemNode.on(cc.Node.EventType.TOUCH_END, this.touchWarsItem, this); 
            
            var titleNode = new cc.Node();
            var titleRichText = titleNode.addComponent(cc.RichText); 
            titleRichText.string = '<outline color=black width=2><i>'+ Utils.LevelNames[i] +'</i></outline>';
            titleRichText.fontSize = 32;
            titleNode.setPosition(0, 0);
            itemNode.addChild(titleNode);
            titleRichText.handleTouchEvent = false;
        }

        var missionCount = 15;
        this.mMissionScrollContent.setContentSize(440, 215 * missionCount);
        for(var i = 0;i < missionCount;i++){
            var itemNode = new cc.Node();
            var itemSp = itemNode.addComponent(cc.Sprite); 
            itemSp.spriteFrame = this.mUISpriteAtlas.getSpriteFrame("bg_common_6");
            itemNode.setContentSize(428, 210);
            itemNode.name = i + "";
            itemNode.setPosition(0, -210 * i - 140);
            this.mMissionScrollContent.addChild(itemNode);
            // itemNode.on(cc.Node.EventType.TOUCH_END, this.touchMissionItem, this); 

            var icon_missionNode = new cc.Node();
            var icon_missionNodeSp = icon_missionNode.addComponent(cc.Sprite); 
            icon_missionNodeSp.spriteFrame = this.mUISpriteAtlas.getSpriteFrame("icon_mission");
            icon_missionNode.setContentSize(111, 108);
            icon_missionNode.setAnchorPoint(0, 0.5);
            icon_missionNode.setPosition(-200, 0);
            itemNode.addChild(icon_missionNode);

            var btnGetNode = new cc.Node();
            var btnGetSp = btnGetNode.addComponent(cc.Sprite); 
            btnGetSp.spriteFrame = this.mUISpriteAtlas.getSpriteFrame("btn_get_1");
            btnGetNode.setContentSize(84, 35);
            btnGetNode.setAnchorPoint(0.5, 0.5);
            btnGetNode.setPosition(160, 0);
            itemNode.addChild(btnGetNode);
            btnGetNode.on(cc.Node.EventType.TOUCH_END, this.touchMissionItem, this); 

            var getNode = new cc.Node();
            var getLbl = getNode.addComponent(cc.Label); 
            getLbl.string = "领取";
            getLbl.fontSize = 18;
            getNode.setAnchorPoint(0.5, 0.5);
            getNode.setPosition(0, -12);
            btnGetNode.addChild(getNode);
            
            var titleNode = new cc.Node();
            var titleLbl = titleNode.addComponent(cc.Label); 
            titleLbl.string = "任务描述:测测测测";
            titleLbl.fontSize = 22;
            titleLbl.lineHeight = 44;
            titleNode.setAnchorPoint(0, 0.5);
            titleNode.setPosition(-70, 25);
            itemNode.addChild(titleNode);

            var contentNode = new cc.Node();
            var contentLbl = contentNode.addComponent(cc.Label); 
            contentNode.setContentSize(200, 40);
            contentLbl.string = "奖励内容:试试试试试试试";
            contentLbl.fontSize = 22;
            contentLbl.lineHeight = 38;
           
            contentNode.setAnchorPoint(0, 0.5);
            contentNode.setPosition(-70, -40);
            itemNode.addChild(contentNode);
        }
    },

    start () {

    },

    touchWarsItem:function(event, customData){
        // console.log("touchItem...index:" + event.target['_name']);
        var index = event.target['_name'];
        this.mWarsListLayer.active = false;
        this.mWarsListDetailLayer.active = true;
        var titleLbl = this.mWarsListDetailLayer.getChildByName("TopItem").getChildByName("Title").getComponent(cc.RichText);
        titleLbl.string = '<outline color=black width=2><i>'+ Utils.LevelNames[index] +'</i></outline>';
        var centerItems = this.mWarsListDetailLayer.getChildByName("CenterItem").getChildren();
        // console.log("centerItems:", centerItems.length);
        this.currentBigLevel = index;
        for(var i = 0;i < centerItems.length;i++){
            centerItems[i].getChildByName("Title").getComponent(cc.RichText).string = '<outline color=black width=2><i>'+ Utils.LevelNames[index] + '-'+ (i + 1) + '</i></outline>';
            centerItems[i].name = i + "";
            centerItems[i].on(cc.Node.EventType.TOUCH_END, this.clickEnterLevel, this);
        }
    },

    touchMissionItem:function(event, customData){
        console.log("touchItem...index:" + event.target['_name']);
        var index = event.target['_name'];
    },

    setImageUrl:function(imgUrl, img){
        cc.loader.load({
            url: imgUrl,
            type: "png"
        }, function(t, e) {
            img.spriteFrame = new cc.SpriteFrame(e);
        });
    },

    clickEnterLevel:function(event){
        // console.log("event:", event);
        var smallLevel = event.currentTarget['_name'];
        console.log("进入第" + (parseInt(this.currentBigLevel) + 1) + "大关,第" + (parseInt(smallLevel) + 1) + "小关");
    },

    onClickUpgrade:function(event, customData) {
        for(var i = 0;i <= 10;i++){
            if(customData == ("upgrade_" + i)){
                console.log("升级:" + Utils.ArmyInfoConnfigs[i].name);
                this.mDialogUpgradeLayer.active = true;
            }
        }
    },

    onClickTrain:function(event, customData) {
        for(var i = 1;i <= 10;i++){
            if(customData == ("train_" + i)){
                console.log("训练:" + Utils.ArmyInfoConnfigs[i].name);
                this.mDialogTrainLayer.active = true;
            }
        }
    },

    onClickBuild:function(event, customData) {
        for(var i = 1;i <= 10;i++){
            if(customData == ("build_" + i)){
                console.log("建造:" + Utils.ArmyInfoConnfigs[i].name);
                this.mDialogBuildLayer.active = true;
                this.updateDailogBuildLayerUI(i);
            }
        }
    },

    onClickBtn:function(event, customData) {
        if(customData == "start"){
            this.mStartLayer.active = false;
            this.mSelectLayer.active = true;
        }else if(customData == "back"){
            this.mStartLayer.active = true;
            this.mSelectLayer.active = false;
        }else if(customData == "warsDetailBack"){
            this.mWarsListDetailLayer.active = false;
            this.mWarsListLayer.active = true;
        }else if(customData == "born"){
            console.log("生皇子...");
        }else if(customData == "buildSuccess"){
            console.log("建造成功...");
            this.mDialogBuildLayer.active = false;
        }else if(customData == "closeDialog"){
            this.mDialogBuildLayer.active = false;
        }
    },

    updateDailogBuildLayerUI:function(index){
        this.mArmyNameLabel.getComponent(cc.Label).string = Utils.ArmyInfoConnfigs[index].name;
        this.mArmyAttack.getComponent(cc.Label).string = "攻击力: " + Utils.ArmyInfoConnfigs[index].attack[0];
        this.mArmyCount.getComponent(cc.Label).string = "容量: " + Utils.ArmyInfoConnfigs[index].count[0];
        this.mArmyCost.getComponent(cc.Label).string = "消耗: " + Utils.ArmyInfoConnfigs[index].cost[0];
    },

    showFunLayerActive:function(index) {
        for(var i = 0; i < this.funcLayerList.length; i++){
            if(i == index){
                this.funcLayerList[i].active = true;
            }else{
                this.funcLayerList[i].active = false;
            }
        }
    },

    onClickToggle:function(event, data) {
        // console.log("onClickToggle...event:", event, " data:", data);
        this.showFunLayerActive(data);

    }

    // update (dt) {},
});
