export function slotAllocation(slotObj, toSlotObj, numSlots) {
    // slotObj = the background object that has slotBusy0, slotBusy1, ...
    // toSlotObj = the object being placed into a slot (powerUp, coin, etc.)
    // numSlots = total number of slots (e.g., 3)

    for (let i = 0; i < numSlots; i++) {

        // Check if slotBusyX is false
        if (!slotObj.instVars["slotBusy" + i]) {

            // Mark slot as busy
            slotObj.instVars["slotBusy" + i] = true;

            // Set animation
            if (toSlotObj.setAnimation) {
                toSlotObj.setAnimation("slotted");
            }

            // Move object to the slot image point
            const x = slotObj.getImagePointX("slot" + i);
            const y = slotObj.getImagePointY("slot" + i);
            toSlotObj.setPosition(x, y);

            // Set the object's slotID
            toSlotObj.instVars.slotID = i;

            return i; // success
        }
    }

    return -1; // all slots full
}

export function moveInventory(moveFrom, moveTo, numSlots, moveableObj) {
    for (let i = 0; i < numSlots; i++) {

        // Only move if THIS object belongs in slot i
        /*if (moveableObj.instVars.slotID !== i)
            continue;*/

        // And only if the source slot is busy
        if (moveFrom.instVars["slotBusy" + i] === true && moveableObj.instVars.slotID === i ) {
            console.log("object moved")

            const x = moveTo.getImagePointX("slot" + i);
            const y = moveTo.getImagePointY("slot" + i);

            moveableObj.setPosition(x, y);

            moveFrom.instVars["slotBusy" + i] = false;
            moveTo.instVars["slotBusy" + i] = true;

            break;
        }
    }
}

