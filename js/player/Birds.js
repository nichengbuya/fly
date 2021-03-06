//小鸟类
//是循环渲染三只小鸟
//其实是循环渲染图片的三个部分
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height);

        //小鸟的三种状态需要一个数组去存储
        //     //小鸟的宽是34，小鸟的高度是24，上下边距是10，小鸟左右边距是9
            this.clippingX = [
                0,
                80,
                160,
                240

            ];
             this.clippingY = [5, 5, 5, 5];
             this.clippingWidth = [80, 80, 80,80];
             this.clippingHeight = [100, 100, 100,100];
             const birdX = DataStore.getInstance().canvas.width / 4;
             this.birdsX = [birdX, birdX, birdX,birdX];
             const birdY = DataStore.getInstance().canvas.height /1.7;
             this.birdsY = [birdY, birdY, birdY,birdY];
             const birdWidth = 80;
             this.birdsWidth = [birdWidth, birdWidth, birdWidth,birdWidth];
             const birdHeight = 100;
             this.birdsHeight = [birdHeight, birdHeight, birdHeight,birdHeight];
             this.y = [birdY, birdY, birdY,birdY];
             this.index = 0;
             this.count = 0;
             this.time = 0;
        }
        //
        draw() {
            //切换三只小鸟的速度
            const speed = 0.08;
            this.count = this.count + speed;
            //0,1,2
            if (this.index >= 3) {
                this.count = 0;
            }
            this.index=this.count;
            //减速器的作用
            this.index = Math.floor(this.count);
            //
            //模拟重力加速度
            // const g = 0.98 / 2.4;
            // // //向上移动一丢丢的偏移量
            // const v = 3;
            // const offsetUp = 30;
            // //小鸟的位移
            // const offsetY = (g * this.time * (this.time - offsetUp)) / 2;
            // // const offsetY = v*this.time-g*this.time*this.time/2;
            // // const offsetY=-30+g*this.time*this.time/2
            // //
            // for (let i = 0; i <= 3; i++) {
            //     this.birdsY[i] = this.y[i] + offsetY;
            // }

            this.time++;

            super.draw(
                this.img,
                this.clippingX[this.index], this.clippingY[this.index],
                this.clippingWidth[this.index], this.clippingHeight[this.index],
                this.birdsX[this.index], this.birdsY[this.index],
                this.birdsWidth[this.index], this.birdsHeight[this.index]
            );
         }


}