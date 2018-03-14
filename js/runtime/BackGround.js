import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director";
import {DataStore} from "../base/DataStore.js";

export class BackGround extends Sprite{
   constructor(){
       const image=Sprite.getImage('background');
       super(image, 0, 0,
           image.width, image.height,
           0, 0,
           DataStore.getInstance().canvas.width*2, DataStore.getInstance().canvas.height);
       //地板的水平变化坐标
       this.landX = 0;
       //地板的移动速度
       this.landSpeed = Director.getInstance().moveSpeed;
   }

    draw() {
        this.landX = this.landX + this.landSpeed;
        if (this.landX >  DataStore.getInstance().canvas.width) {
            this.landX =0;
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.landX,
            this.y,
            this.width,
            this.height)
    }

}

// import {Sprite} from "../base/Sprite.js";
// import {Director} from "../Director";
//
// export class BackGround extends Sprite{
//     constructor(){
//         const image=Sprite.getImage('background');
//         super(image,0,0,image.width,image.height,
//             0,0, image.width, image.height);
//         this.landX=0;
//         //地板的移动速度
//         this.landSpeed=Director.getInstance().landSpeed;
//     }
//     draw(){
//         this.landX=this.landX+this.landSpeed;
//         if(this.landX>=DataStore.getInstance().canvas.width){
//             this.landX=0;
//         }
//         super.draw(this.img,
//             this.srcX,
//             this.srcY,
//             this.srcW,
//             this.srcH,
//             this.x-this.landX,
//             this.y,
//             this.width,
//             this.height
//
//         )
//         super.draw(this.img,
//             this.srcX,
//             this.srcY,
//             this.srcW,
//             this.srcH,
//             DataStore.getinstance().canvas.width-this.landX,
//             this.y,
//             this.width,
//             this.height
//
//         )
//
//     }
// }