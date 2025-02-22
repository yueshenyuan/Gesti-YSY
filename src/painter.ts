/*
	使用代理模式重写Painter，兼容原生Painter
*/
 class Painter implements Painter{
    paint:CanvasRenderingContext2D=null;
	constructor(paint:CanvasRenderingContext2D) {
		this.paint = paint;
	}
	//仅限window
	get canvas() {
		if (typeof(window) != "undefined") return this.paint.canvas;
		return undefined;
	}
	set fillStyle(style:string) {
		this.paint.fillStyle = style;
	}
	set lineWidth(width:number) {
		this.paint.lineWidth = width;
	}
	set strokeStyle(style:string) {
		this.paint.strokeStyle = style;
	}
	draw() {
		this.paint?.draw();
	}
	strokeRect(x:number, y:number, w:number, h:number) {
		this.paint.strokeRect(x, y, w, h);
	}
	fillRect(x:number, y:number, w:number, h:number) {
		this.paint.fillRect(x, y, w, h);
	}
	stroke() {
		this.paint.stroke();
	}
	clearRect(x:number, y:number, w:number, h:number) {
		if (typeof(uni) != 'undefined')
			this.draw();
		else
			this.paint.clearRect(x, y, w, h);
	}
	save() {
		this.paint.save();
	}
	rotate(angle:number) {
		this.paint.rotate(angle);
	}
	beginPath() {
		this.paint.beginPath();
	}
	closePath() {
		this.paint.closePath();
	}
	restore() {
		this.paint.restore();
	}
	translate(x:number, y:number) {
		this.paint.translate(x, y);
	}
	fill() {

		this.paint.fill();
	}
	arc(x:number, y:number, radius:number, start:number, end:number) {
		this.paint.arc(x, y, radius, start, end);
	}
	arcTo(x1:number, y1:number, x2:number, y2:number, radius:number){
		this.paint.arcTo(x1, y1, x2, y2, radius);
	}
	/**
	 * 
	 * @param x 圆心点x
	 * @param y 圆心点y
	 * @param a width
	 * @param b height
	 */
	ellipse(x: number, y: number, a: number, b: number): void {
        this.paint.save();
        this.paint.translate(x,y);
        const r = (a > b) ? a : b;
        const rx = a / r, ry = b / r;
        this.paint.scale(rx, ry);
        this.paint.beginPath();
        this.paint.arc(0,0, r, 0, 2 * Math.PI);
        this.paint.closePath();
        this.paint.restore();
    }
	drawImage(image: HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas, x:number, y:number, width:number, height:number) {
		this.paint.drawImage(image, -width / 2, -height / 2, width, height);
	}
	scale(a:number, b:number) {
		this.paint.scale(a, b);
	}
	moveTo(x:number, y:number) {
		this.paint.moveTo(x, y);
	}
	lineTo(x:number, y:number) {
		this.paint.lineTo(x, y);
	}
	getImageData(x:number, y:number, w:number, h:number) {
		return this.paint.getImageData(x, y, w, h);
	}
	fillText(text: string, x: number, y: number, maxWidth?: number){
		this.paint.fillText(text,x,y,maxWidth);
	}
	strokeText(text: string, x: number, y: number, maxWidth?: number){
		this.paint.strokeText(text,x,y,maxWidth);
	}
	set font(font:string){
		this.paint.font=font;
	}
	measureText(text:string):TextMetrics{
		return this.paint?.measureText(text);
	}
	set lineCap(lineCap:any){
		this.paint.lineCap=lineCap;
	}
	set lineJoin(lineJoin:any){
		this.paint.lineJoin=lineJoin;
	}
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number):void{
		this.paint.quadraticCurveTo(cpx,cpy,x,y);
	}
	/*清空画布|刷新画布*/
	update() {

	}
}


export default Painter;