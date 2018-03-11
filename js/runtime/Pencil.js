/**
 * Created by 傅令杰
 * 铅笔的基类
 */
import { Sprite } from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Pencil extends Sprite {

  constructor( top,spacing) {
   const image=Sprite.getImage('pencilDown')
    super(image,
      0, 0,
      image.width, image.height,
      //刚好在右侧看不到的位置
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height);
    this.top = top;
    this.spacing=spacing;
    this.moveSpeed = 1.5;
  }


  draw() {
      let gap = DataStore.getInstance().canvas.height / 5;
      this.y = this.top + gap;
     this.x = this.x - this.moveSpeed;
    super.draw(this.img,
      0, 0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height)
  }
}