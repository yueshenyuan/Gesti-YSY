import ViewObject from "../abstract/view-object";
import WriteBase from "../abstract/write-category";
import Rect from "../rect";
import Vector from "../vector";
import WriteViewObj from "../viewObject/write";
class WriteCircle extends WriteBase {
    currentPosition: Vector = new Vector(0, 0);
    points: Array<Vector> = [];
    draw(position: Vector) {
        this.currentPosition = position;
        const { sx, sy, x, y, minx, miny, width, height } = this.getParams();
        this.paint.ellipse(minx + width * .5, miny + height * .5, width * .5, height * .5);
        this.paint.stroke();
        this.paint.fillRect(sx, sy, 3, 3);
        this.paint.fillRect(x, sy, 3, 3);
        this.paint.fillRect(x, y, 3, 3);
        this.paint.fillRect(sx, y, 3, 3);
    }
    getParams() {
        const sx = this.startPoint.x, sy = this.startPoint.y;
        const x = this.currentPosition.x, y = this.currentPosition.y;
        const width = Math.abs(sx - x), height = Math.abs(sy - y);
        const minx = Math.min(x, sx), miny = Math.min(y, sy);
        return {
            sx, sy, x, y, minx, miny, width, height
        }
    }
    async getWriteViewObject(): Promise<ViewObject> {
        if (!this.startPoint) return null;
        const { sx, sy, x, y, minx, miny, width, height } = this.getParams();
        const p1 = new Vector(sx, sy), p2 = new Vector(x, y);
        this.points = [p1, p2];
        const rect: Rect = new Rect(
            {
                width,
                height,
                x: minx + width * .5,
                y: miny + height * .5,
            }
        );
        const rx = rect.position.x, ry = rect.position.y;
        this.points.forEach((item: Vector) => {
            item.x -= rx;
            item.y -= ry;
        })
        const viewobj = new WriteViewObj(this.points, this.color, this.config);
        viewobj.rect = rect;
        viewobj.init();
        this.reset();
        this.points = [];
        return viewobj;
    }
}

export default WriteCircle;