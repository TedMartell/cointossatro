export function shopSpawn(quantity, itemList, duplicates) {
    // Convert object → array of items
    const items = Object.values(itemList);

    // Safety check for no-duplicate mode
    if (!duplicates && quantity > items.length) {
        throw new Error("shopSpawn: quantity exceeds available unique items.");
    }

    const result = [];
    let pool = [...items]; // working copy

    for (let i = 0; i < quantity; i++) {
        // Compute total weight of current pool
        const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
        let r = Math.random() * totalWeight;
        let chosenIndex = 0;

        // Weighted pick
        for (let j = 0; j < pool.length; j++) {
            r -= pool[j].weight;
            if (r <= 0) {
                chosenIndex = j;
                break;
            }
        }

        const chosen = pool[chosenIndex];
        result.push(chosen.name);

        // If duplicates are not allowed, remove the chosen item from the pool
        if (!duplicates) {
            pool.splice(chosenIndex, 1);
        }
    }

    return result;
}