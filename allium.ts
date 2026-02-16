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


    // inventory
    export enum Items {
        SWORD,
        MAGIC
    }

    // the held item :p
    export let heldItem: Items;

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
        }

        return result;
    }

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

    // main
    player.setPosition(hyacinth.centerScreenX, hyacinth.centerScreenY); // center of the screen
    setHeldItem(Items.SWORD);

    readout.setPosition(hyacinth.centerScreenX, hyacinth.centerScreenY - 40);
    readout.z = -3;

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        setHeldItem(iterateItem());
    });

    forever( function () {
        readout.sayText("~ " + itemToString() + " ~", Infinity, false, 1, 15);
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
        }


        if (hyacinth.isDevelopmentEnvironment(true)) console.log("Task completed: " + task.toString());
    }
}