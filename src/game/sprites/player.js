import * as PIXI from 'pixi.js'

import { isTouching } from '../helpers/collision'
import map from '../helpers/map'
import { Rotation, Animation } from './utils';

export default class {
    constructor({ speed, state, walls, x, y }) {
        this.sprite = PIXI.Sprite.from(require("@/assets/ant/ant-2.png"));
        this.sprite.anchor.set(0.5);
        this.sprite.width = 50;
        this.sprite.height = 50;
        this.sprite.y = y;
        this.sprite.x = x;

        this.walls = walls;

        this.animator = new Animation(this.sprite, {
            textures: [
                require('@/assets/ant/ant-1.png'),
                require('@/assets/ant/ant-2.png'),
                require('@/assets/ant/ant-3.png'),
                require('@/assets/ant/ant-4.png')
            ]
        });

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

        // Object used to text movement / collision
        this.collisionBox = {
            width: this.hitbox.width,
            height: this.hitbox.height,
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

    update(delta, speed) {
        this.animate(delta);
        this.rotateTowardsAngle();
        this.directions = []; // Clear directions
        this._speed = speed ? speed : this._speed;
    }

    animate(delta) {
        this.animator.enabled = this.isMoving;
        this.animator.speed = map(this.speed, 10, 2, this._speed + this._speedPenaltyDecrease, this._speed + this._speedBonusIncrease);
        this.animator.update(delta);
    }

    rotateTowardsAngle() {
        this._targetAngle = this.rotator.getAngleFromDirections(this._previousDirections);

        let bias = 0.85; // Weighted bias for rotate spring function

        this.sprite.angle = this.sprite.angle * bias + this._targetAngle * (1 - bias);

    }

    updateCollisionBox() {
        this.collisionBox.y = this.hitbox.y - (this.hitbox.height / 2);
        this.collisionBox.x = this.hitbox.x - (this.hitbox.width / 2);
    }

    // Returns element that player is touching or false if they arn't touching anything
    isTouching(array) {
        let collisionDetected = false;
        array.forEach(item => {
            // console.log(isTouching(this.collisionSprite, wall))
            if (isTouching(this.collisionBox, item)) {
                collisionDetected = true;
                return item;
            }
        })
        return collisionDetected
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