//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Cartman} from "./js/player/Cartman.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
import {Tramp} from "./js/runtime/Tramp";

export class Main{
    constructor(){
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore=DataStore.getInstance();
        this.director = Director.getInstance();
        const loader=ResourceLoader.create();
        loader.onLoaded(map=>this.onResourceFirstLoaded(map))


    }

    onResourceFirstLoaded(map){
        //永远得到保存，ctx res
        this.dataStore.ctx=this.ctx;
        this.dataStore.res=map;
        this.init();

    }
    init(){
        this.dataStore
            .put('background', BackGround)
            .put('land',Land)
            .put('tramp',Tramp)
        ;
        this.director.run();
    }
}