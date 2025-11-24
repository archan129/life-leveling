export function completeTask(user, task) {
    const gainedXP = task.difficulty * 10;
    user.globalXP += gainedXP;

    const statGains = {};
    let statLeveled = {};

    // Update each stat
    for (const stat in task.statMap) {
        const gain = task.statMap[stat] * gainedXP;
        user.stats[stat].xp += gain;
        statGains[stat] = gain;

        // Handle individual stat level-up
        if (user.stats[stat].xp >= 100) {
            user.stats[stat].level += 1;
            user.stats[stat].xp -= 100; // carry over extra XP
            statLeveled[stat] = true;
        }
    }

    // Handle global level-up
    let globalLeveled = false;
    if (user.globalXP >= 100) {
        user.globalLevel += 1;
        user.globalXP -= 100; // carry over extra XP
        globalLeveled = true;
    }

    return { gainedXP, statGains, statLeveled, globalLeveled };
}
