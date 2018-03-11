import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class BackGround extends Sprite{
   constructor(){
       const image=Sprite.getImage('background');
       super(image,0,0,image.width,image.height,
           0,0,window.innerWidth,window.innerHeight);
       this.landX=0;
       //地板的移动速度
       this.landSpeed=Director.getInstance().landSpeed;
   }
    draw(){
        this.landX=this.landX+this.landSpeed;
        if(this.landX>=window.innerWidth){
            this.landX=0;
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x-this.landX,
            this.y,
            this.width,
            this.height

        )
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            window.innerWidth-this.landX,
            this.y,
            this.width,
            this.height

        )

    }
}