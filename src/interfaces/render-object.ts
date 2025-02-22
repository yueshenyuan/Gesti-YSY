import Painter from "../painter";
import Rect from "../rect";

/**
 * 在页面上渲染的对象
 */
export interface RenderObject {
    key: string | number;
    /**
     * 世界坐标，相对于画布的坐标
     */
    rect: Rect;
    draw(paint: Painter): void;
    update(paint: Painter): void;
    onSelected(): void;
    //相对坐标，相对于画布在translate
    relativeRect: Rect;
    disabled: boolean;
}

export default RenderObject;