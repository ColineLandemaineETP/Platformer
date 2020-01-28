var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}

};

var game = new Phaser.Game(config);

function init(){
	var platforms;
	var player;
	var cursor;

}


function preload(){
	this.load.image('background','assets/sky.png');	
	this.load.image('sol','assets/platform.png');
	this.load.spritesheet('perso','assets/dude.png',{frameWidth: 32, frameHeight: 48});
}

function create(){
	this.add.image(400,80,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(400,600,'sol').setScale(1).refreshBody();
	platforms.create(1275,385,'sol')
	platforms.create(0,50,'sol')
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(200);
	this.physics.add.collider(player,platforms);

	cursor = this.input.keyboard.createCursorKeys();

	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 4, end: 4}),
		frameRate: 20,
		repeat: -1
	});



}

function update() {
	
	if(cursor.left.isDown){
		player.anims.play('left',true);
		player.setVelocityX(-350);
		player.setFlipX(false);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(350);
		player.setFlipX(true);	
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown && player.body.touching.down){
		player.setVelocityY(-470);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(700);
	}
}