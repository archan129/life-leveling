
function xpForNextLevel(level) {
    return 50 + level * 25; // example: increases by 25 each level
}

export function completeTask(user, task) {
    const gainedXP = task.difficulty * 10;
    user.globalXP += gainedXP;

    const statGains = {};
    const statLeveled = {};

    for (const stat in task.statMap || {}) {
        const gain = task.statMap[stat] * gainedXP;
        user.stats[stat].xp += gain;
        user.stats[stat].lastGainedXP = gain;
        statGains[stat] = gain;

        const requiredXP = xpForNextLevel(user.stats[stat].level);
        if (user.stats[stat].xp >= requiredXP) {
            user.stats[stat].level += 1;
            user.stats[stat].xp -= requiredXP; // carry over extra XP
            statLeveled[stat] = true;
        }
    }


    // Global level
    const globalRequiredXP = xpForNextLevel(user.globalLevel);
    let globalLeveled = false;
    if (user.globalXP >= globalRequiredXP) {
        user.globalLevel += 1;
        user.globalXP -= globalRequiredXP;
        globalLeveled = true;
    }


    return { user, gainedXP, statGains, statLeveled, globalLeveled };
}
