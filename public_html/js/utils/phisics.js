define(function() {

	var Pi2 = 3.14159 * 2;
	var Time = new Date();
	var lastTime = Time.getTime();
	var tracks = [];
	var bubbles = [];

	var timeToLive = 100;
	var g = 0.2;
	var maxAngle = 70;
	var minPitch = 180;
	var maxPitch = 800;

	var images = [];
	var numImages = 0;
	var loadedImages = 0;
	var TO_RADIANS = Math.PI/180;

	function loadImages(sources) {
		numImages = sources.length;
		for(var item in sources) {
			images[item] = new Image();
			images[item].onload = function() {
				if(++loadedImages >= numImages) {
					console.log('all images loaded');
					console.log(images);
				}
			};
			images[item].src = sources[item].src;
		}
		return images;
	}

	//HELPERS---------------------------------
	function vectorsLength(v){
		return Math.sqrt(v.x*v.x + v.y*v.y);
	}

	function vectorsAngle(v1, v2){
		return Math.acos((v1.x * v2.x + v1.y * v2.y)/(vectorLength(v1) * vectorLength(v2)));
	};

	function orthogonalTo(v){
		return {x : -v.y, y : v.x};
	};

	function random(from, to) {
		return Math.random() * (to - from) + from;
	};

	function maxRange (pitch, power) {
		return maxRange = power*power / g * Math.sin(2*(pitch - minPitch) / maxPitch * maxAngle/180*3.14);
	};

	function getPhisParams(pitch, power) {
		power = 100 * power;
		var sx = 0;
		var sy = random(window.innerHeight - 100, window.innerHeight);
		var angle = (pitch - minPitch) / maxPitch * maxAngle;
		var angRad = angle/180*3.14;
		var vx = power * Math.cos(angRad);
		var vy = -power * Math.sin(angRad);
		var maxRange = power*power / g * Math.sin(2*angRad);
		return {sx : sx, sy : sy, angDeg : angle, angRad : angRad, vx : vx, vy : vy, maxRange : maxRange};
	};

	function createTrack(pitch, power){
		var params = getPhisParams(pitch, power);
		var traectory = [];
		for (var x = params.sx; x <= window.innerWidth; x += 50) {
			var t = (x - params.sx) / params.vx;
			var y = params.sy + params.vy * t + g*t*t/2;
			traectory.push({X: x, Y: y});
			if(y > window.innerHeight){
				break;
			}			
		};
		tracks.push({state: timeToLive, path: traectory});
		//return maximum traectory flying range
		return traectory[traectory.length - 1].X;
	};

	function createBullet (pitch, power) {
		var params = getPhisParams(pitch, power);
		var rand = Math.round(Math.random() * 3);
		bubbles.push(new MathModel({
			Rad : 50,
			pos : {
				X : params.sx,
				Y : params.sy
			},
			Vx : params.vx,
			Vy : params.vy,
			Ax : 0,
			Ay : g,
			image : images[rand]
		}));
	};

	function MathModel(params){
		this.state = {
			pos : {X : 0, Y : 0},
			Vx : 0,
			Vy : 0,
			Ax : 0,
			Ay : 1,
			Rad : 20,
			cdX : false,
			cdY : false,
			stability : 1,
			state : timeToLive,
			image: false,
			angle: 0,
			Diam : 0,
			wallX : false,
			wallY : false,
		};
		for (var key in params) {
			this.state[key] = params[key];
		};
		this.state.Diam = 2 * this.state.Rad;
	};

	MathModel.prototype.update = function(forces, delta_time){

		var p = this.state;
		//p.Vx += p.Ax * delta_time;
		p.pos.X += p.Vx * delta_time;

		p.Vy += p.Ay * delta_time;
		p.pos.Y += p.Vy * delta_time;		
	};

	MathModel.prototype.draw = function(canvas){
		var p = this.state;
		var context = canvas.getContext('2d');
		context.beginPath();
		if(p.Rad !== 0){
			context.ellipse(p.pos.X, p.pos.Y, p.Rad, p.Rad, 0, 0, Pi2);
			//debugger;
			var grd = context.createRadialGradient(p.pos.X - p.Rad/2 + 5, p.pos.Y - p.Rad/2, 0, p.pos.X, p.pos.Y, p.Rad + 5 );
			var redness = Math.round(p.pos.X * 255 / (canvas.width / 2));
			var blueness = Math.round((canvas.width - p.pos.X) * 255 / (canvas.width / 2));
			if (redness > 255) redness = 255;
			if (blueness < 0) blueness = 0;
			grd.addColorStop(0.2,'rgba(255, 255, 255, 0.5)');
			grd.addColorStop(0.9,'rgba('+redness+', 0, '+blueness+', 0.8)');
			grd.addColorStop(1,'rgba(255, 0, 255, 0.8)');

			context.fillStyle = grd;
			context.fill();
		}
	};

	MathModel.prototype.drawImg = function(canvas){
		var p = this.state;
		var context = canvas.getContext('2d');
		var image = p.image;

		context.save();
		context.translate(p.pos.X, p.pos.Y);
		context.rotate(p.angle * TO_RADIANS);
		context.drawImage(image, -(image.width/2), -(image.height/2));
		context.restore(); 
	};

	MathModel.prototype.collision = function(collision_with, delta_time){
		var p2 = collision_with.state;
		var p1 = this.state;

		var dx = p1.pos.X - p2.pos.X;
		var dy = p1.pos.Y - p2.pos.Y;
		var dist = dx*dx + dy*dy;
		var sumRad = p1.Rad + p2.Rad;
		var min_dist = Math.pow(sumRad, 2);

		if(dist <= min_dist){

			if(dist <= min_dist * 0.4){
				////p1.stability -= 0.002 * p1.Rad;
				//p2.stability -= 0.002 * p2.Rad;
				////if(p2.stability < 0){
					p1.Vx = (p1.Vx + p2.Vx) / 2;
					p1.Vy = (p1.Vy + p2.Vy) / 2;
					p1.Ax = (p1.Ax + p2.Ax) / 2;
					p1.Ay = (p1.Ay + p2.Ay) / 2;
					p1.pos.X = (p1.pos.X + p2.pos.X) / 2;
					p1.pos.Y = (p1.pos.Y + p2.pos.Y) / 2;
					p1.Rad = Math.pow(Math.pow(p1.Rad, 3) + Math.pow(p2.Rad, 3), 0.3);
					p2.Rad = 0;
					p2.wallY = p2.wallX = false;
					p1.stability = 1;
					return false;
				////}
			}

			//p1.stability -= 0.001 * p1.Rad;

			collisionPointX = ((p1.pos.X * p2.Rad) + (p2.pos.X * p1.Rad)) / (p1.Rad + p2.Rad); 
			collisionPointY = ((p1.pos.Y * p2.Rad) + (p2.pos.Y * p1.Rad)) / (p1.Rad + p2.Rad);

			var normal = orthogonalTo({x : collisionPointX - p1.pos.X, y : collisionPointY - p1.pos.Y});
			var deffLine = {
				x1 : collisionPointX + normal.x,
				y1 : collisionPointY + normal.y,
				x2 : collisionPointX - normal.x,
				y2 : collisionPointY - normal.y,
			};

			var angle = Math.atan2(dy, dx)

			var sp1 = Math.sqrt(p1.Vx * p1.Vx + p1.Vy * p1.Vy);
			var sp2 = Math.sqrt(p2.Vx * p2.Vx + p2.Vy * p2.Vy);

			var a1 = Math.atan2(p1.Vy, p1.Vx) - angle;
			var a2 = Math.atan2(p2.Vy, p2.Vx) - angle;

			var vx1 = sp1 * Math.cos(a1);
			var vy1 = sp1 * Math.sin(a1);
			var vx2 = sp2 * Math.cos(a2);
			var vy2 = sp2 * Math.sin(a2);

			var newVelX1 = ((p1.Rad - p2.Rad) * vx1 + (2 * p2.Rad) * vx2) / sumRad;
			var newVelX2 = ((2 * p1.Rad) * vx1 + (p2.Rad - p1.Rad) * vx2) / sumRad;

			var cosAngle = Math.cos(angle);
			var sinAngle = Math.sin(angle);

			p1.Vx = cosAngle * newVelX1 - sinAngle * vy1;
			p1.Vy = sinAngle * newVelX1 + cosAngle * vy1;
			p2.Vx = cosAngle * newVelX2 - sinAngle * vy2;
			p2.Vy = sinAngle * newVelX2 + cosAngle * vy2;

			//console.log('collide');
			return deffLine;
		}
		return false;
	};

	MathModel.prototype.wallCollision = function(size, delta_time){
		var wallTolerance = 0;
		var p = this.state;
		var elasticity = 0.5;

		if(p.pos.X + p.Rad > size.width || p.pos.X - p.Rad < 0){
			if(p.wallX == false){
				p.Vx = -p.Vx;
				p.pos.X += p.Vx * delta_time;
				p.Vx *= elasticity;
				p.wallX = true;
			}
		}else{
			p.wallX = false;
		}

		if(p.pos.Y + p.Rad >= size.height || p.pos.Y - p.Rad <= 0){
			if(p.wallY == false){
				p.Vy = -p.Vy;
				p.pos.Y += p.Vy * delta_time;
				p.Vy *= elasticity;
				p.wallY = true;
			}
		}else{
			p.wallY = false;
		}

		if(p.wallX || p.wallY){
			p.stability -= 0.01;
		}
	};

	// function animate(bubbles, forces, canvas, tracks) {
	function animate(canvas) {

		var context = canvas.getContext('2d');
		var currentTime = (new Date).getTime();
		var dT = currentTime - lastTime;
		lastTime = currentTime;
		dT /= 15;

		// clear
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < tracks.length; i++){
			//debugger;
			var track = tracks[i].path;
			context.beginPath();
			for (var j = 0; j < track.length - 1; j++){
				context.moveTo(track[j].X, track[j].Y);
				context.lineTo(track[j+1].X, track[j+1].Y);
			}
			context.strokeStyle = '#FFF';
			context.stroke();

			if(--(tracks[i].state) < 0){
				tracks.splice(i, 1);
			}
		}

		for (var i = bubbles.length - 1; i >= 0; i--) {
			//debugger;
			bubbles[i].update(0, dT);
			bubbles[i].state.angle -= 5;
			bubbles[i].drawImg(canvas);
			//bubbles[i].draw(canvas);
			if(--(bubbles[i].state.state) < 0){
				bubbles.splice(i, 1);
			}
		};

	};

	return {
		animate: animate,
		createTrack: createTrack,
		createBullet: createBullet,
		initialize: loadImages,
		touch: MathModel.prototype.wallCollision
	};

});