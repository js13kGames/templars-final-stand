import { GameObjectClass } from "kontra";
import { drawPolygon } from "../../utils/draw-utils";
import { COLOR } from "../../constants/color";
import { tween } from "../../utils/tween-utils";

type ArrowType = "u" | "d";

export class Arrow extends GameObjectClass {
  private isPlaying: boolean = false;
  private type: ArrowType;

  constructor(x: number, y: number, type: ArrowType = "u") {
    super({ x, y });
    this.opacity = 0;
    this.type = type;
  }
  public async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const currY = this.y;
    const currX = this.x;
    await tween(
      this,
      { scale: 2.5, targetX: currX - 14, targetY: currY - 6, opacity: 1 },
      200
    );
    const offset = this.type === "u" ? -50 : 50;
    tween(this, { targetY: currY + offset }, 600);
    await tween(this, { opacity: 0 }, 700);

    // reset
    this.setScale(1);
    this.x = currX;
    this.y = currY;
    this.opacity = 0;
    this.isPlaying = false;
  }

  draw(): void {
    drawPolygon(
      this.context,
      this.type === "u"
        ? "11 0 0 11 0 18 11 8 22 18 22 11 11 0"
        : "11 18 22 7 22 0 11 10 0 0 0 7 11 18",
      this.type === "u" ? COLOR.WHITE_6 : COLOR.RED_6
    );
  }
}
