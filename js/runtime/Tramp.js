//流浪汉
import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Tramp extends Sprite{
    constructor(){
        const image=Sprite.getImage('tramp');
        super(image,0,0,image.width,image.height,
            0,window.innerHeight*(2/3),200,74);
        // this.spacing=spacing;
        this.landX=0;
        this.landSpeed=Director.getInstance().landSpeed;
    }
    draw(){
        this.landX=this.landX+this.landSpeed;

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

    }
}