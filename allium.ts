/* 
Do note I am not using my own Menu Engine, built using Hyacinth.
But I can show examples of this, and am choosing not to use it here to make the Development process easier.
*/

// hyacinth implementation
/*  makecode.com/_XbqJPWgqa0Jo   */
hyacinth.setDeveloper(true);


// using a default namespace, similar to a package for source code.
// similar to Modding's 'net.chemthunder.modid', running as 'net.chemthunder.allium'!
namespace Allium {
    // utils
    export let allSprites: Sprite[] = [];
    export let shouldShowDebug: boolean = false;

    export enum Items {
        SWORD,
        MAGIC,
        BURST
    }

    export enum Facing {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }

    // the held item :p
    export let heldItem: Items;
    export let currentDir: Facing;

    // gets the current direction.
    export function getDir(): Facing {
        return currentDir;
    }

    // sets the current direction.
    export function setDir(facing: Facing): void {
        currentDir = facing;
    }

    // gets the held item.
    export function getHeldItem(): Items {
        return heldItem;
    }

    // sets the held item.
    export function setHeldItem(item: Items): void {
        heldItem = item;
    }

    // gets the next item.
    export function iterateItem(): Items {
        let result: Items;

        switch (heldItem) {
            case (Items.SWORD): {
                result = Items.MAGIC;
                break;
            }

            case (Items.MAGIC): {
                result = Items.BURST;
                break;
            }

            case (Items.BURST): {
                result = Items.SWORD;
                break;
            }
        }

        return result;
    }

    export function itemToString(): string {
        let result: string = "";

        switch (heldItem) {
            case (Items.SWORD): {
                result = "Sword";
                break;
            }

            case (Items.MAGIC): {
                result = "Magic";
                break;
            }

            case (Items.BURST): {
                result = "Burst";
                break;
            }
        }
        return result;
    }

    export function dirToString(): string {
        let result: string = null;
        switch (currentDir) {
            case (Facing.UP): { result = "up"; break; }
            case (Facing.DOWN): { result = "down"; break; }
            case (Facing.LEFT): { result = "left"; break; }
            case (Facing.RIGHT): { result = "right"; break; }

            default: { result = "null"; break; }
        }
        return result;
    }

    export let xSpeed = 100;
    export let ySpeed = 100;

    // image registry
    let playerImage: Image = img`
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
        1 1 1 1 1 1 1 1 1 1 1 1
    `;
    let empty: Image = img`
        .
    `;


    // sprite registry (export = can be used outside of the namespace)
    export let player: Sprite = sprites.create(playerImage, SpriteKind.Player);
    export let readout: Sprite = sprites.create(empty, SpriteKind.MenuElement);
    export let devInfo: Sprite = sprites.create(empty, SpriteKind.Placeholder);

    // main
    player.setPosition(hyacinth.centerScreenX, hyacinth.centerScreenY); // center of the screen
    Allium.setHeldItem(Items.SWORD);
    Allium.setDir(Facing.UP);

    readout.setPosition(hyacinth.centerScreenX, hyacinth.centerScreenY - 40);
    readout.z = -3;

    devInfo.setPosition(readout.x, readout.y + 15);
    devInfo.z = -3

    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        Allium.setHeldItem(iterateItem());
        scene.cameraShake(1.5, 200);
    });

    forever(function () {
        readout.sayText("< " + Allium.itemToString() + " >", Infinity, false, 1, 15);
        if (Allium.shouldShowDebug) {
            devInfo.sayText(Allium.dirToString(), Infinity, false, 1, 15);
        }
    });

    forever(function () {
        controller.left.onEvent(ControllerButtonEvent.Pressed, function () { Allium.setDir(Facing.LEFT); });
        controller.right.onEvent(ControllerButtonEvent.Pressed, function () { Allium.setDir(Facing.RIGHT); });
        controller.up.onEvent(ControllerButtonEvent.Pressed, function () { Allium.setDir(Facing.UP); });
        controller.down.onEvent(ControllerButtonEvent.Pressed, function () { Allium.setDir(Facing.DOWN); });
    });

    forever( function () {
        controller.moveSprite(Allium.player, Allium.xSpeed, Allium.ySpeed);
    });
}

namespace AlliumBackend {
    export enum Tasks {
        ForceClose
    }

    export function backend(task: Tasks): void {
        if (task == Tasks.ForceClose) {
            for (let value of Allium.allSprites) {
                sprites.destroy(value);
            }
            game.reset();
        }

        if (hyacinth.isDevelopmentEnvironment(true)) console.log("Task completed: " + task.toString());
    }
}