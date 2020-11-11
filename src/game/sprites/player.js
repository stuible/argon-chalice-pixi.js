import * as PIXI from 'pixi.js'

import { isTouching } from '../helpers/collision'
import map from '../helpers/map'
import { Rotation, Animation } from './utils';

export default class {
    constructor({ speed, state, walls, x, y }) {

        let frontImages = [
            require("@/assets/player/Front-1.svg"),
            require("@/assets/player/Front-2.svg"),
            require("@/assets/player/Front-3.svg"),
            require("@/assets/player/Front-4.svg"),
        ];
        let backImages = [
            require("@/assets/player/Back-1.svg"),
            require("@/assets/player/Back-2.svg"),
            require("@/assets/player/Back-3.svg"),
            require("@/assets/player/Back-4.svg"),
        ];
        let sideImages = [
            require("@/assets/player/Side-2.svg"),
            require("@/assets/player/Side-3.svg"),
            require("@/assets/player/Side-4.svg"),
            require("@/assets/player/Side-5.svg"),
        ];

        this.textures = {
            front: frontImages.map(image => PIXI.Texture.from(image)),
            back: backImages.map(image => PIXI.Texture.from(image)),
            side: sideImages.map(image => PIXI.Texture.from(image)),
        }
        this.spriteDirection = 'front'


        this.sprite = new PIXI.AnimatedSprite(this.textures[this.spriteDirection]);

        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();


        // this.sprite = PIXI.Sprite.from(require("@/assets/characters/player.svg"));
        this.sprite.anchor.set(0.5);
        this.sprite.width = 30;
        this.sprite.height = 75;
        this.sprite.y = y ?? 0;
        this.sprite.x = x ?? 0;

        this.walls = walls ?? [];


        this.state = state;

        // Hidden Hitbox sprite that doesn't rotate
        this.hitbox = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.hitbox.anchor.set(0.5);
        this.hitbox.width = this.sprite.width * 0.75;
        this.hitbox.height = this.sprite.height * 0.75;
        this.hitbox.y = this.sprite.y;
        this.hitbox.x = this.sprite.x;
        this.hitbox.tint = 0xFF0000;
        this.hitbox.visible = false;

        // Object used to test movement / collision
        this.collisionBox = {
            width: this.hitbox.width,
            height: this.hitbox.height / 2,
            offset: {
                x: 0,
                y: this.hitbox.height / 2 + 10
            },
            x: 0,
            y: 0
        }
        this.updateCollisionBox();

        //Player Proximity
        this.nearThreshold = 40;

        this.rotator = new Rotation(this.sprite);

        this.directions = [];
        this._previousDirections = [];
        this._targetAngle = 0;

        this._speed = speed ? speed : 5;

        this._speedBonusIncrease = this._speed * 1.3;
        this._speedPenaltyDecrease = -(this._speed / 1.4);
    }

    isTouching(sprite) {
        let aBox = this.hitbox.getBounds();
        let bBox = sprite.getBounds();
        return isTouching(aBox, bBox);
    }

    get nearCollisionBox() {
        const threshold = this.nearThreshold * 2;
        return {
            width: this.hitbox.width + threshold,
            height: this.hitbox.height + threshold,
            x: this.hitbox.x - ((this.hitbox.width + threshold) / 2),
            y: this.hitbox.y - ((this.hitbox.height + threshold) / 2)
        }
    }

    get speedBonus() {
        return this.state.speedBonus;
    }

    get speedPenalty() {
        return this.state.speedPenalty;
    }

    get speed() {
        return this._speed + this.speedBonusIncrease + this.speedPenaltyDecrease;
    }

    get speedBonusIncrease() {
        return this.speedBonus ? this._speedBonusIncrease : 0;
    }

    get speedPenaltyDecrease() {
        return this.speedPenalty ? this._speedPenaltyDecrease : 0;
    }

    get x() {
        return this.hitbox.x;
    }
    get y() {
        return this.hitbox.y;
    }
    get height() {
        return this.hitbox.height;
    }
    get width() {
        return this.hitbox.width;
    }
    get position() {
        return this.hitbox.position;
    }

    get isMoving() {
        return this.directions.length > 0;
    }

    set x(x) {
        this.sprite.x = x;
        this.hitbox.x = x;
    }
    set y(y) {
        this.sprite.y = y;
        this.hitbox.y = y;
    }
    set height(h) {
        this.sprite.height = h;
        this.hitbox.height = h;
    }
    set width(w) {
        this.sprite.width = w;
        this.hitbox.width = w;
    }

    update(delta) {
        this.animate();
        // this.rotateTowardsAngle();
        this.directions = []; // Clear directions
    }

    changeSpriteSet(direction) {
        if (this.spriteDirection != direction) {
            if (direction == "back") {
                this.sprite.textures = this.textures[direction];
                this.sprite.scale.x = Math.abs(this.sprite.scale.x)
                this.spriteDirection = direction;
            }
            else if (direction == "front") {
                this.sprite.textures = this.textures[direction];
                this.sprite.scale.x = Math.abs(this.sprite.scale.x)
                this.spriteDirection = direction;
            }
            else if (direction == "left") {
                this.sprite.textures = this.textures.side;
                this.sprite.scale.x = -Math.abs(this.sprite.scale.x)
                this.spriteDirection = direction;
            }
            else if (direction == "right") {
                this.sprite.textures = this.textures.side;
                this.sprite.scale.x = Math.abs(this.sprite.scale.x)
                this.spriteDirection = direction;
            }

        }

    }

    animate() {
        if (this.isMoving) {
            if (this.directions[0] == "up") {
                this.changeSpriteSet("back")
            }
            else if (this.directions[0] == "down") {
                this.changeSpriteSet("front")
            }
            else if (this.directions[0] == "right") {
                this.changeSpriteSet("right")
            }
            else if (this.directions[0] == "left") {
                this.changeSpriteSet("left")
            }
            this.sprite.play();
        }
        else this.sprite.stop();

    }

    rotateTowardsAngle() {
        this._targetAngle = this.rotator.getAngleFromDirections(this._previousDirections);

        let bias = 0.85; // Weighted bias for rotate spring function

        this.sprite.angle = this.sprite.angle * bias + this._targetAngle * (1 - bias);

    }

    updateCollisionBox() {
        this.collisionBox.y = this.hitbox.y - (this.hitbox.height / 2) + this.collisionBox.offset.y;
        this.collisionBox.x = this.hitbox.x - (this.hitbox.width / 2) + this.collisionBox.offset.x;
    }

    // Returns element that player is touching or false if they arn't touching anything
    isTouching(sprite) {
        return isTouching(this.collisionBox, sprite)
    }

    // Returns element that player is near or false if they arn't touching anything
    isNear(sprite) {
        return isTouching(this.nearCollisionBox, sprite);
    }

    canMove(direction) {
        this.updateCollisionBox();
        switch (direction) {
            case "up":
                this.collisionBox.y -= this.speed;
                break;
            case "down":
                this.collisionBox.y += this.speed;
                break;
            case "left":
                this.collisionBox.x -= this.speed;
                break;
            case "right":
                this.collisionBox.x += this.speed;
                break;
            default:
                break;
        }

        let collisionDetected = false;
        this.walls.forEach(wall => {
            // console.log(isTouching(this.collisionSprite, wall))
            if (isTouching(this.collisionBox, wall)) {
                collisionDetected = true;
            }
        })
        return !collisionDetected
    }

    move(direction) {
        // console.log(this.canMove(direction))
        if (!this.canMove(direction)) return false

        switch (direction) {
            case "up":
                this.y -= this.speed;
                break;
            case "down":
                this.y += this.speed;
                break;
            case "left":
                this.x -= this.speed;
                break;
            case "right":
                this.x += this.speed;
                break;
            default:
                return;
        }
        this.directions.push(direction);
        this._previousDirections = this.directions.length > 0 ? [...this.directions] : this._previousDirections; // If there are directions, save them
    }

    // User pressed action button
    action() {

    }
}