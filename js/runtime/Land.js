import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director";

export class Land extends Sprite{
  constructor(){
      const image=Sprite.getImage('land');
      super(image,0,0,
          image.width, image.height,
          0,window.innerHeight-image.height*(window.innerWidth/image.width),
          window.innerWidth,image.height*(window.innerWidth/image.width));
      //地板的变化坐标
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