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
