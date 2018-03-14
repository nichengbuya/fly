//导演类，控制游戏的逻辑

import {DataStore} from "./base/DataStore.js";

import {Pencil} from "./runtime/Pencil.js";

let flag = false;

export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 3;
         this.flag=flag=false;

    }

    createPencil() {
        // const minSpacing=DataStore.getInstance().canvas.width/5;
        // const maxSpacing=DataStore.getInstance().canvas.width/3;
        // const spacing=minSpacing+Math.random()*(maxSpacing-minSpacing);
        const minTop = DataStore.getInstance().canvas.height / 1.7;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);

        this.dataStore.get('pencils').push(new Pencil(top));
    }

    flyEvent() {
        flag = true;
        this.dataStore.get('fly').index = 0;

    }

    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }



    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('fly');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        //地板的撞击判断

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到流浪汉啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            wx.vibrateShort({
                success: function () {
                    console.log('飞跃成功');
                }
            });
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {

            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw();

            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 &&
                pencils.length === 2) {
                pencils.shift();
                this.dataStore.get('score').isScore=true;


            }

            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
                pencils.length === 1) {
                this.createPencil();
            }

            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            //
            // this.dataStore.get('score').draw();
            if (!flag) {
                this.dataStore.get('birds').draw();
            }

            if (flag) {
                this.dataStore.get('fly').draw();
                console.log(this.dataStore.get('fly').birdsY
                    // >[246,246,246,246,246]
                )
                // console.log(this.dataStore.get('fly').index
                // )

                if (this.dataStore.get('fly').birdsY >
                    // DataStore.getInstance().canvas.height / 1.7
                    [246, 246, 246, 246, 246]
                ) {
                    flag = !flag;

                    this.dataStore.get('fly').time = 0;

                }


            }
            this.dataStore.get('score').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
        }

    }


}
